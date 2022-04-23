const express= require('express')
const app = express()
app.use(express.json())

const users = require("./routes/users")
app.use("/users", users)

const posts = require("./routes/posts")
app.use("/posts", posts)

const reviews = require("./routes/reviews")
app.use("/reviews", reviews)

const cart = require("./routes/cart")
app.use("/cart", cart)

const history = require("./routes/history")
app.use("/history", history)

app.listen(5000)
