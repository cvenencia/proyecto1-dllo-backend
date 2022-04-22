const mongoose = require("../mongo")
const userSchema = require("../schemas/user")
const UserModel = mongoose.model("User", userSchema)

async function registerUser(data) {
    const exists = await userExists(data.username)
    if (!exists) {
        const newUser = new UserModel(data)
        newUser.save(function (err, u) {
            if (err) return console.error(err)
            console.log(u.username + " registered.")
        })
        return newUser
    } else {
        return null
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

module.exports = {registerUser, loginUser}
