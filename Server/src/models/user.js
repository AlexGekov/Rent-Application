import apartment from './appartment'

const mongoose = require('mongoose')

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
    apartments: [
        {
            type: apartment
        }
    ]
})

const User = mongoose.model("User", userSchema)

module.exports = User