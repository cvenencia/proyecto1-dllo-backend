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

const {getRecentPosts, publishPost} = require("../db/queries/post")

router.get("/recent", async (req, res) => {
    res.status(200).json(await getRecentPosts())
})

router.post("/", async (req, res) => {
    publishPost(req.body)
    res.status(200).json({
        message: "Post created succesfully."
    })
})
