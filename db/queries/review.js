const mongoose = require("../mongo")
const reviewSchema = require("../schemas/review")
const ReviewModel = mongoose.model("ReviewModel", reviewSchema)
const ObjectId = require('mongoose').Types.ObjectId

async function createReview(data) {
    const newReview = new ReviewModel(data)
    const {errors} = await newReview.save().catch(err => err)
    const valid = errors ? false : true
    if (valid) {
        console.log("Review created.")
    }
    return valid
}

async function getProductReviews(product_id) {
    const pipeline = [
        {$match: {
            product_id: new ObjectId(product_id)
        }},
    ]
    return await ReviewModel.aggregate(pipeline).exec()
}

module.exports = {createReview, getProductReviews}
