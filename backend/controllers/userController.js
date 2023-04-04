const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../models/userModel');


//Register a New user
//@route /api/users
//@access Public

const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body

    //Validation
    if(!name || !email || !password) {
      res.status(400)
      throw new Error('Please Include all fields')
    }
    
    //Find if user already exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new error('Invalid user data')
    }
})

//Login Registered user
//@route /api/users/login
//@access Public

const loginUser =  asyncHandler(async (req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    //check user and password matches

    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Credentials')
    }
})

//Get current user
//@route /api/users/welcome
//@access Private

const welcome = asyncHandler(async (req,res) => {
    res.send('Welcome')
})



//Update current user
//@route /api/users/update
//@access Private

const updateUser = asyncHandler(async (req, res) => {
    const { _id, name, email, password } = req.body;
  
    // Check if user exists
    const user = await User.findById(_id);
    if (!user) {
      res.status(404);
      throw new Error('Gotcha!!!!');
    }
  
    // Update user information
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
  
    // Save updated user to database
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
    console.log("User Updated")
});

//Generate Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    welcome,
    updateUser,
}