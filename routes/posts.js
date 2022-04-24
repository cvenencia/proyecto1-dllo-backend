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

const {getRecentPosts, publishPost, getPostById, getUserPosts} = require("../db/queries/post")

router.get("/recent", async (req, res) => {
    res.status(200).json(await getRecentPosts())
})

router.post("/", async (req, res) => {
    errors = await publishPost(req.body)
    if (!errors) {
        res.status(200).json({
        message: "Post created succesfully."
        })
    } else {
        message = Object.keys(errors).map(key => errors[key].message).join(" ")
        res.status(400).json({message})
    }
})

router.get("/", async (req, res) => {
    let post = null
    if (req.query.user_id) {
        post = await getUserPosts(req.query.user_id)
    } else {
        post = await getPostById(req.query.post_id)
    }
    res.status(200).json(post)
})
