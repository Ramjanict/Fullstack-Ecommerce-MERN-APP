const userModel = require("../../models/userModel");

const allusers = async (req, res) => {
  try {
    const alluser = await userModel.find();
    res.json({
      message: "All user",
      data: alluser,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = allusers;
