const mongoose = require('mongoose')

const {Schema} = mongoose

const reviewSchema = new Schema({
    description: String,
    rating: {
        type: Number,
        validate: rating => rating >= 0 && rating <= 5
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Post"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
})

module.exports = reviewSchema
