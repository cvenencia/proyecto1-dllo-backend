const mongoose = require("../mongo")
const userSchema = require("../schemas/user")
const UserModel = mongoose.model("User", userSchema)
const {createCart} = require("./cart")

async function registerUser(data) {
    const exists = await userExists(data.username)
    if (!exists) {
        const newUser = new UserModel(data)
        const {errors} = await newUser.save().catch(err => err)
        const valid = errors ? false : true
        if (valid) {
            await createCart(newUser)
            return newUser
        } else {
            return 0
        }
    } else {
        return -1
    }
}

async function userExists(username) {
    const user = await UserModel.findOne({username: username}).exec()
    return user == null ? false : true
}

async function loginUser(data) {
    const user = await UserModel.findOne(data).exec()
    return user
}

async function getUserById(id) {
    const user = await UserModel.findById(id)
    return user
}

module.exports = {registerUser, loginUser, getUserById}
