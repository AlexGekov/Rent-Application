const mongoose = require('mongoose')

const appartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    tenants: {
        type: Object,
        required: true
    },

    rent: {
        type: Number,
        required: true
    }
})

const appartment = mongoose.model("Appartment", appartmentSchema)

module.exports = appartment
