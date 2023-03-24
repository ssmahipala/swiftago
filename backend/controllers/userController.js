//Register a New user
//@route /api/users
//@access Public

const registerUser = (req,res) => {
    const {name, email, password} = req.body
    res.send('Register Route')

    //Validation
    if(!name || !email || !password) {
       return res.status(400).json({message: 'Please include all the fields'})
    }
}

//Login Registered user
//@route /api/users/login
//@access Public

const loginUser = (req,res) => {
    res.send('Login Route')
}

module.exports = {
    registerUser,
    loginUser,
}