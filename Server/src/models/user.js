const mongoose = require('mongoose')
const Apartment = require('./apartment')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unquie: true
    },
    username: {
        type: String,
        required: true,
        unquie: true
    },
    password: {
        type: String,
        required: true,
    },
    apartments: [{
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
        },

        owner: {
            type: String,
            required: true
        },

        profit: {
            type: String
        },

        Electricity: {
            type: String
        },

        Water: {
            type: String
        },

        Heating: {
            type: String
        },
    }
    ]
})

const User = mongoose.model("User", userSchema)

module.exports = User