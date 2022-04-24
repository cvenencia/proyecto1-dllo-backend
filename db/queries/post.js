const mongoose = require("../mongo")
const postSchema = require("../schemas/post")
const PostModel = mongoose.model("Post", postSchema)
const ObjectId = require('mongoose').Types.ObjectId

async function getRecentPosts() {
    const pipeline = [
        {$limit: 20},
        {$sort: {created_date: -1}}
    ]
    return await PostModel.aggregate(pipeline).exec()
}

async function publishPost(data) {
    const newPost = new PostModel({
        created_date: new Date(),
        ...data
    })
    const {errors} = await newPost.save().catch(err => err)
    return errors
}

async function getPostById(id) {
    return await PostModel.findById(id)
}

async function getUserPosts(user_id) {
    const pipeline = [
        {$match: {
            owner_id: new ObjectId(user_id)
        }},
        {$sort: {created_date: -1}}
    ]
    return await PostModel.aggregate(pipeline).exec()
}

module.exports = {getRecentPosts, publishPost, getPostById, getUserPosts}
