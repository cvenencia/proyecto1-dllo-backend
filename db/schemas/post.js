const mongoose = require('mongoose')

const {Schema} = mongoose

const postSchema = new Schema({
    display_name: {
        type: String,
        required: [true, "Name required."]
    },
    description: String,
    img_url: {
        type: String,
        validate: {
            validator: url => {
                const ex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/gi
                var regex = new RegExp(ex)
                return regex.test(url) || url == ""
            },
            message: "Invalid URL."
        }
    },
    price: {
        type: Number,
        required: [true, "Price required."]
    },
    created_date: {
        type: Date,
        required: [true, "Date required."]
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: [true, "Owner required."]
    }
})

module.exports = postSchema
