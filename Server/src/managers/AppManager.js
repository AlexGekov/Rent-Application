const User = require('../models/user')

// exports.GetFromUser = async (userId) =>{
//     const user = await User.find(userId)
//     const apartments = user.apartments
// }

exports.Find = (Id) => apartment.findById(Id).lean()

exports.create = async (Data) => {
    const kindLength = 4
    const nameLength = 3
    const descriptionLength = 10

    if (Data.kind.length <= kindLength) {
        throw new Error(`Kind should be at least ${kindLength} characters long`)
    }
    if (Data.name.length <= nameLength) {
        throw new Error(`Name should be at least ${nameLength} characters long`)
    }
    if (Data.year <= 1930 && Data.year >= 2024) {
        throw new Error(`Year is from 1930 until the current year!`)
    }
    if (Data.description.length < descriptionLength) {
        throw new Error(`Description should be at least ${descriptionLength} characters long`)
    }
    if (!Data.image.startsWith("https://") && !Data.image.startsWith("http://")) {
        throw new Error(`Image should start with "https://" or "http://"`)
    }

    await apartment.create(Data)
}

exports.search = async (Param) => {
    let result = await apartment.find().lean()
    result = result.filter(post => post.name.toLowerCase().includes(Param.toLowerCase()))
    return result
}

exports.Delete = (Id) => apartment.findByIdAndDelete(Id)

exports.Edit = (Id, Data) => apartment.findByIdAndUpdate(Id, Data)