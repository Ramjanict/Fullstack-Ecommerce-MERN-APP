const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please provide your email");
    }
    if (!password) {
      throw new Error("Please provide your password");
    }
    //login in user
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User has not found correctly");
    }
    //hash password is user.password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const tokenData = {
        _id: user.id,
        email: user.email,
      }; //login user details
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "12h",
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };
      res.cookie("token", token, tokenOption).status(201).json({
        message: "Login Successfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Please check the password");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = userSignin;
