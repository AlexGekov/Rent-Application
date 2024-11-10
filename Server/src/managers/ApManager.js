const Apartment = require('../models/apartment')
const User = require('../models/user')

exports.Find = async(userId, apId) => {
    let user = await User.findById(userId)
    let apartment = user.apartments.find( app => app._id == apId)
    return apartment
}

exports.create = async (apData, userId) => {
    console.log("in create!")
    const user = await User.findById(userId)
    const nameLength = 5
    const locationLength = 6

    if (!apData.name) {
        throw new Error("Name is required!")
    } else if (apData.name.length < nameLength) {
        throw new Error("Name is too short!")
    }

    if (!apData.location) {
        throw new Error("Location is required!")
    } else if (apData.location.length < locationLength) {
        throw new Error("Enter a real location!")
    }

    if (!apData.image) {
        throw new Error("An image is required!")
    }
      

    if (!apData.tenants) {
        throw new Error("Tenants are required!")
    }

    if(!apData.rent){
        throw new Error("Rent is required")
    }

    if(!apData.sign_date){
        throw new Error("Sign date is required")
    }

    const apartment = apData
    apartment.owner = userId
    user.apartments.push(apartment)
    user.save()
    return
}

exports.search = async (Param) => {
    let result = await apartment.find().lean()
    result = result.filter(post => post.name.toLowerCase().includes(Param.toLowerCase()))
    return result
}

exports.Delete = async (userId, apId) => {
    let apartment = Apartment.findById(apId)
    if(apartment.owner == userId){
        Apartment.findByIdAndDelete(apId)
    }
    return
}

exports.Edit = (Id, Data) => apartment.findByIdAndUpdate(Id, Data)