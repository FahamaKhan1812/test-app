const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../models/User");

//Create a new User
const userRegister = async (userDetails, role, res) => {
  try {
    // Validate the username
    let usernameNotTaken = await validateUsername(userDetails.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: `Username is already taken.`,
        success: false,
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(userDetails.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false,
      });
    }

    // Get the hashed password
    const password = await bcrypt.hash(userDetails.password, 12); //Hash of 12 round of salts
    // create a new user
    const newUser = new User({
      ...userDetails,
      password,
      role,
    });

    await newUser.save();
    return res.status(201).json({
      message: "User is saved successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false,
    });
  }
};

//Login user
const userLogin = async (userCreds, res) => {
  let { username, password } = userCreds;
  // First Check if the username is in the database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found.",
      success: false,
    });
  }

  //Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // create JWT Token for the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        name: user.name,
        farm_Id: user?.farm_Id,
        slaughter_house_Id: user?.slaughter_house_Id,
      },
      "SUPER-SECRETKEY",
    );
    let result = {
      username: user.username,
      token,
    };
    return res.status(200).json({
      message: "Login Successfully",
      success: true,
      data: result
    });
  } else {
    return res.status(403).json({
      //403 = Unauthorized
      message: "Uncorrect password",
      success: false,
    });
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

//Passport middleware for proctecting
const userAuth = passport.authenticate("jwt", { session: false });

// Check role middleware
const checkRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    return next();
  }
  return res.status(401).json({
    message: "Unauthorized",
    success: false,
  });
};

module.exports = {
  userAuth,
  checkRole,
  userRegister,
  userLogin,
};
