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

const {createReview, getProductReviews} = require("../db/queries/review")

router.post("/", async (req, res) => {
    if (await createReview(req.body)) {
        res.status(200).json({
            message: "Review created."
        })
    } else {
        res.status(400).json({
            message: "Invalid rating."
        })
    }
})

router.get("/", async (req, res) => {
    const reviews = await getProductReviews(req.query.product_id)
    res.status(200).json(reviews)
})
