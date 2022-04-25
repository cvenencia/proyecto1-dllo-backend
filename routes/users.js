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

const {registerUser, loginUser, getUserById} = require("../db/queries/user")

router.post("/register", async (req, res) => {
    const response = await registerUser(req.body)
    if (typeof(response) != "number"){
        res.status(201).json(response)
    } else if (response == 0){
        res.status(400).json({
            message: "Invalid form."
        })
    } else {
        res.status(409).json({
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
        res.status(401).json({
            message: "Invalid login credentials."
        })
    }
})

router.post("/prev-login", async (req, res) => {
    const loggedUser = await getUserById(req.body.user_id)
    if (loggedUser){
        res.status(200).json(loggedUser)
        console.log(`${loggedUser.username} re-logged in.`)
    } else {
        res.status(401).json({
            message: "Invalid login credentials."
        })
    }
})

router.get("/", async (req, res) => {
    const user = await getUserById(req.query.user_id)
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({
            message: "User does not exist."
        })
    }
})
