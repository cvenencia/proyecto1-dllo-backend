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

const {createReview, getProductReviews, getUserReviews} = require("../db/queries/review")

router.post("/", async (req, res) => {
    errors = await createReview(req.body)
    if (!errors) {
        res.status(200).json({
            message: "Review created."
        })
    } else {
        message = Object.keys(errors).map(key => errors[key].message).join(" ")
        res.status(400).json({message})
    }
})

router.get("/", async (req, res) => {
    if (req.query.user_id) {
        const reviews = await getUserReviews(req.query.user_id)
        res.status(200).json(reviews)
    } else {
        const reviews = await getProductReviews(req.query.product_id)
        res.status(200).json(reviews)
    }
})
