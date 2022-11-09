const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ownerSchema = new Schema({
    teamName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const Owner = mongoose.model('Owner', ownerSchema)

module.exports = Owner