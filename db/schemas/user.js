const mongoose = require('mongoose')

const {Schema} = mongoose

const userSchema = new Schema({
    display_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = userSchema
