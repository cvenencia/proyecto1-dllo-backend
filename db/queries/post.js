const mongoose = require("../mongo")
const postSchema = require("../schemas/post")
const PostModel = mongoose.model("Post", postSchema)

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
    newPost.save(function (err, p) {
        if (err) return console.error(err)
        console.log(p.display_name + " post created.")
    })
}

async function getPostById(id) {
    return await PostModel.findById(id)
}

module.exports = {getRecentPosts, publishPost, getPostById}