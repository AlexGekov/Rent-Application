const User = require('../models/user')

exports.Find = (Id) => apartment.findById(Id).lean()

exports.create = async (appData, userId) => {
    console.log("in create!")
    const user = await User.find(userId)
    const nameLength = 5
    const locationLength = 6

    if (!appData.name) {
        throw new Error("Name is required!")
    } else if (appData.name.length < nameLength) {
        throw new Error("Name is too short!")
    }

    if (!appData.location) {
        throw new Error("Location is required!")
    } else if (appData.location.length < locationLength) {
        throw new Error("Enter a real location!")
    }

    if (!appData.image) {
        throw new Error("An image is required!")
    } else if (!appData.image.includes(".jpg") && !appData.image.includes(".png")) {
        throw new Error("Jpg/png image is required")
    }

    if (!appData.tenants) {
        throw new Error("Tenants are required!")
    }

    if(!appData.rent){
        throw new Error("Rent is required")
    }

    if(!appData.sign_date){
        throw new Error("Sign date is required")
    }

    const apartment = appData
    console.log(user.apartments)
    // return user.apartments.push(apartment)
}

exports.search = async (Param) => {
    let result = await apartment.find().lean()
    result = result.filter(post => post.name.toLowerCase().includes(Param.toLowerCase()))
    return result
}

exports.Delete = (Id) => apartment.findByIdAndDelete(Id)

exports.Edit = (Id, Data) => apartment.findByIdAndUpdate(Id, Data)