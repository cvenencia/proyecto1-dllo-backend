const express = require('express')
const router = express.Router()
router.use(express.json())
module.exports = router

router.use(( req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if ( req.method === 'OPTIONS' ) {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
    }
    next();
})

const {
    getUserCart,
    addItemToCart,
    deleteItemFromCart,
    buyCart
} = require("../db/queries/cart")

router.get("/", async (req, res) => {
    const cart = await getUserCart(req.query.user_id)
    res.status(200).json(cart.items)
})

router.post("/", async (req, res) => {
    await addItemToCart(req.body)
    res.status(201).json({message: "Item added."})
})

router.delete("/", async (req, res) => {
    await deleteItemFromCart(req.query.item_id)
    res.status(204).json()
})

router.post("/buy", async (req, res) => {
    await buyCart(req.body.user_id)
    res.status(200).json({message: "Cart purchased."})
})
