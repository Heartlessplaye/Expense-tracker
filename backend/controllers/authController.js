const jwt = require("jsonwebtoken");
const User = require("../models/User");

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// register user
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;
  // validation

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // if email already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
     return  res.status(400).json({ message: "Email already exists" });
    }
    // create user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({message: 'Error while registering user', error : err.message}); 
  }
};

//login user 
exports.loginUser = async (req, res) => {
    const {email , password } = req.body; 
   // validation

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({email}); 
   
    if(!user  || !(await user.comparePassword(password))) {
        return res.status(400).json({
            message : "Invalid credentials"
        })
    }

    res.status(200).json({
        id: user._id,
        user,
        token: generateToken(user._id),
    })
  }
  catch (err ){
    res.status(500).json({
        message : "Error while login User", 
        error : err.message
    })
  }


}

// get user info 
exports.getUserInfo = async (req, res) => {
    try{
        // const user = await User.findById(req.user.id).select("-password");
          if(!(req.user)) {
            return res.status(404).json({
                message : "User not found"
            })
          }

          res.json(req.user); 

    }
    catch (err) {
        res.status(500).json({
            message : "Error while finding userinfo", 
            error : err.message
        })
    }
}
