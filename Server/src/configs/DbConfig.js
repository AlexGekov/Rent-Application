const mongoose = require("mongoose")

let uri = 'mongodb://127.0.0.1:27017/Rent-Application'

async function dbConnect() {
    await mongoose.connect(uri)
}

module.exports = dbConnect