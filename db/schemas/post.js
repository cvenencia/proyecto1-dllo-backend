const mongoose = require('mongoose')

const {Schema} = mongoose

const postSchema = new Schema({
    display_name: String,
    description: String,
    img_url: String,
    price: Number,
    created_date: Date
})

module.exports = postSchema
