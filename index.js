const express= require('express')
const app = express()
app.use(express.json())

const mongoose = require('mongoose')
const mongo = require("./db/mongo")

const users = require("./routes/users")
app.use("/users", users)

const posts = require("./routes/posts")
app.use("/posts", posts)

const reviews = require("./routes/reviews")
app.use("/reviews", reviews)

app.listen(5000)
