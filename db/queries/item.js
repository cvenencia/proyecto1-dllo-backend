const mongoose = require("../mongo")
const itemSchema = require("../schemas/item")
const ItemModel = mongoose.model("Item", itemSchema)
const ObjectId = require('mongoose').Types.ObjectId

async function createItem(data) {
    const item = new ItemModel(data)
    item.save(function (err, i) {
        if (err) return console.error(err)
        console.log(`Item created`)
    })
    return item
}

async function deleteItem(item_id) {
    await ItemModel.deleteOne({_id: item_id}).exec()
}

async function getItem(item_id) {
    return await ItemModel.findOne({_id: item_id}).exec()
}

module.exports = {createItem, getItem, deleteItem}
