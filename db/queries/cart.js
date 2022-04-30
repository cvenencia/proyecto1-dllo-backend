const mongoose = require("../mongo")
const cartSchema = require("../schemas/cart")
const CartModel = mongoose.model("Cart", cartSchema)
const ObjectId = require('mongoose').Types.ObjectId

const {createItem, deleteItem, getItem} = require("./item")

async function createCart({_id} = user) {
    const newCart = new CartModel({
        items: [],
        user_id: _id
    })
    newCart.save(function (err, c) {
        if (err) return console.error(err)
        console.log(`Cart created`)
    })
}

async function getUserCart(user_id) {
    const cart = await CartModel.findOne({
        purchased: false,
        user_id: new ObjectId(user_id)
    }).exec()
    return cart
}

async function addItemToCart(data) {
    const cart = await getUserCart(data.user_id)
    const item = await createItem({
        cart_id: cart._id,
        ...data
    })
    cart.items.push(item)
    cart.save(function (err, c) {
        if (err) return console.error(err)
        console.log(`Cart updated`)
    })
}

async function deleteItemFromCart(item_id) {
    const pipeline = [
        {$pull: {
            items: {
                $match: {_id: item_id}
            }
        }}
    ]
    const item = await getItem(item_id)
    const cart = await CartModel.findOne({_id: item.cart_id}).exec()
    cart.items = cart.items.filter(i => i._id != item_id)
    cart.save(function (err, c) {
        if (err) return console.error(err)
        console.log(`Deleted item from cart`)
    })
    await deleteItem(item_id)
}

async function buyCart(user_id) {
    const cart = await getUserCart(user_id)
    cart.purchased = true
    cart.purchased_date = new Date()
    cart.save(function (err, c) {
        if (err) return console.error(err)
        console.log(`Cart purchased.`)
    })
    await createCart({_id: user_id})
}

async function getPurchaseHistory(user_id) {
    const pipeline = [
        {$match: {
            purchased: true,
            user_id: new ObjectId(user_id)
        }},
        {$sort: {purchased_date: -1}}
    ]
    const history = await CartModel.aggregate(pipeline).exec()
    return history.map(cart => cart.items).flat()
}

module.exports = {createCart, getUserCart, addItemToCart, deleteItemFromCart, buyCart, getPurchaseHistory}
