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

const {registerUser, loginUser} = require("../db/queries/user")

router.post("/register", async (req, res) => {
    const newUser = await registerUser(req.body)
    if (newUser){
        res.status(200).json(newUser)
    } else {
        res.status(400).json({
            message: "User already exists."
        })
    }
})

router.post("/login", async (req, res) => {
    const loggedUser = await loginUser(req.body)
    if (loggedUser){
        res.status(200).json(loggedUser)
        console.log(`${req.body.username} logged in.`)
    } else {
        res.status(400).json({
            message: "Invalid login credentials."
        })
    }
})
