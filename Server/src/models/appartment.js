const mongoose = require('mongoose')

const apartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    tenants: {
        type: String,
        required: true
    },

    rent: {
        type: String,
        required: true
    },

    sign_date: {
        type: String,
        required: true
    }
})

const apartment = mongoose.model("Apartment", apartmentSchema)

module.exports = apartment
