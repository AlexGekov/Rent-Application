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
})

const User = mongoose.model("User", userSchema)

module.exports = User