const mongoose = require('mongoose')

const {Schema} = mongoose

const reviewSchema = new Schema({
    description: {
        type: String,
        required: [true, "Description required."]
    },
    rating: {
        type: Number,
        validate: {
            validator: rating => rating >= 0 && rating <= 5,
            message: "Invalid rating."
        },
        required: [true, "Rating required."]
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Post",
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    }
})

module.exports = reviewSchema
