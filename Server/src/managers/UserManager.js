const bcrypt = require('bcrypt')
const SECRET = require('../configs/SuperSecret')
const jwt = require('../lib/jwtPromise')
const User = require('../models/user')

const emailLength = 5
const usernameLength = 4
const passwordLength = 4

function validate(userData, confpassword){
    const EmailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!userData.email) {
        errObj.email = "Email is required!"
    } else if (userData.email.length < emailLength) {
        errObj.email = `Email should be at least ${emailLength} characters long!`
    } else if (!EmailReg.test(userData.email)) {
        errObj.email = "Please provide a valid email!"
    }

    if (!userData.username) {
        errObj.username = "Username is required!"
    } else if (userData.username.length < usernameLength) {
        errObj.username = `Username should be at leat ${usernameLength} characters long!`
    }

    if (!userData.password) {
        errObj.password = "Password is required!"
    } else if (userData.password.length < passwordLength) {
        errObj.password = `Password should be at least ${passwordLength} characters long!`
    } else if (!confpassword) {
        errObj.confpassword = "Confirmation password is required!"
    } else if (userData.password != confpassword){
        errObj.password = "Passwords do not match!"
    }
}


exports.register = async (userData, confpassword) => {
    try{
        validate(userData, confpassword)
        userData.password = await bcrypt.hash(userData.password, 10)
        const user = await User.create(userData)
        return getAuthResult(user)
    }catch(err){
        throw new Error(err.message)
    }
}

exports.login = async (userData) => {
    try{
        const user = await User.find({email: userData.email})

        if (user) {
            const isValid = bcrypt.compare(userData.password, user[0].password)
            
            if (!isValid){
                throw new Error("Email or password do not match")
            }
            
            return getAuthResult(user[0])
        }

    }catch(err){
        throw new Error('Email, username or password do not match!')
    }
}

async function getAuthResult(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
    }
    const token = jwt.sign(payload, SECRET)
    return [payload, token]
}

exports.findUser = async (userId) => {
    const user = await User.find(userId)
    if(user){
        return getAuthResult(user)
    }else{
        throw new Error('invalid user')
    }
}

exports.findApartments = async (userId) => {
    const user = await User.findById(userId)
    let apartments = user.apartments
    return apartments
}