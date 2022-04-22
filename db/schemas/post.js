const mongoose = require('mongoose')

const {Schema} = mongoose

const postSchema = new Schema({
    display_name: String,
    description: String,
    img_url: String,
    price: Number,
    created_date: Date,
    owner_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
})

module.exports = postSchema
