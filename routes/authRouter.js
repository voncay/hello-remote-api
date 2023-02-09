const express = require('express')
const authRouter = express.Router()
const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
authRouter.use(express.json())

authRouter.post('/register', async (req, res ) => {

    // check if the email already exists in my database
    const emailExist = await Users.findOne({email : req.body.email})
    if(emailExist) return res.status(400).send('Email already taken')

    // encrypt the password
    const salt = await bcrypt.genSalt(10) // salt add a unique value to the password to increase the encryption
    const hashPassword = await bcrypt.hash(req.body.password, salt) // hash the passord of the user, adding the salt

    //create the user with info provided
    const user = new Users({
        email: req.body.email,
        password: hashPassword,
        user_type: req.body.user_type
    })

    user.save()
    res.send(user)
})

authRouter.post('/login', async (req, res) => {

    // we check if there is an email which match the email provided by the user
    const user = await Users.findOne({email : req.body.email})  // find by email (not by id)
    if(!user) return res.status(400).send('Email not found, please register')

    // we compare the password we have in our db with the end send by the user(req.body.passord)
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Password is not valid, please try again')

    // console.log(res.data, "res.data from auth login")

    const token = jwt.sign({user}, process.env.SECRET) // other options is expiration
    res.header('auth-token', token)
    res.json(token)
})

module.exports = authRouter
