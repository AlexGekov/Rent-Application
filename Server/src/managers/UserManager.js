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

async function getAuthResult(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
    }
    console.log('pre token')
    const token = jwt.sign(payload, SECRET)
    console.log('after token')
    console.log(token)

    return [payload, token]
}