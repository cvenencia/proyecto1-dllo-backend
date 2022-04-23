const mongoose = require('mongoose')

const {Schema} = mongoose

const cartSchema = new Schema({
    items: Array,
    purchased: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
})

module.exports = cartSchema
