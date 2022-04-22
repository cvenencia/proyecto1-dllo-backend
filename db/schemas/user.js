const mongoose = require('mongoose')

const {Schema} = mongoose

const userSchema = new Schema({
    display_name: String,
    username: String,
    password: String
})

module.exports = userSchema
