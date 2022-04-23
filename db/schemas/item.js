const mongoose = require('mongoose')

const {Schema} = mongoose

const itemSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    }
})

module.exports = itemSchema
