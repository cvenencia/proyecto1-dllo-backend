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

const {getPurchaseHistory} = require("../db/queries/cart")

router.get("/:user_id", async (req, res) => {
    const history = await getPurchaseHistory(req.params.user_id)
    res.status(200).json(history)
})
