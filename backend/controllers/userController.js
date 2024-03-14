const asyncHandler = require(`express-async-handler`)
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require(`../models/userModel`)

const registerUser = asyncHandler(async (req, res) => {
    //res.json({message:`Register User successful`})
    const { name, email, password, age, gender, school, phone } = req.body

    if (!name || !email || !password || !age || !gender || !school || !phone){
        res.status(400)
        throw new Error(`All fields are mandatory`)
    }

    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400)
        throw new Error(`User Exists`)
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ name, email, password: hashedPassword, age, gender, school, phone})

    if (user){
        res.status(201).json({ _id: user.id, name: user.name, email: user.email, token: generateJWTtoken(user.id)})
    } else {
        res.status(400)
        throw new Error(`Invalid user data`)
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.json({ _id: user.id, name: user.name, email: user.email, token: generateJWTtoken(user.id)})
    } else {
        res.status(400)
        throw new Error(`Invalid or incorrect credentials`)
    }
})

const getCurrentUser  = asyncHandler(async (req, res) => {
    const { _id, name, email} = await User.findById(req.user.id)
    res.status(200).json({ id: _id, name, email})
})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    console.log(req.params.id)
    const { _id, name, email, age, password, gender, school, phone, token} = user;
    res.status(200).json({ _id: _id, name, email, age, password, gender, school, phone, token: generateJWTtoken(user.id) });
  });
  

const generateJWTtoken = id => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: `5d`})

module.exports = { registerUser, loginUser, getCurrentUser, getUser }