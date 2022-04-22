const express = require('express')
const router = express.Router()
router.use(express.json())
module.exports = router

const {registerUser, loginUser} = require("../db/queries/user")

router.use(( req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if ( req.method === 'OPTIONS' ) {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
    }
    next();
})

router.post("/register", async (req, res) => {
    if (await registerUser(req.body)){
        res.status(200).json({
            message: "User registered succesfully." 
        })
    } else {
        res.status(400).json({
            message: "User already exists."
        })
    }
})

router.post("/login", async (req, res) => {
    if (await loginUser(req.body)){
        res.status(200).json({
            message: "Valid login." 
        })
        console.log(`${req.body.username} logged in.`)
    } else {
        res.status(400).json({
            message: "Invalid login credentials."
        })
    }
})
