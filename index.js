const express= require('express')
const app = express()
app.use(express.json())

const mongoose = require('mongoose')
const mongo = require("./db/mongo")

const users = require("./routes/users")
app.use("/users", users)

app.listen(5000)
