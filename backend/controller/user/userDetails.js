const userModel = require("../../models/userModel");
const userDetails = async (req, res) => {
  try {
    //froms authToken   req.userId = decoded._id;
    const user = await userModel.findById(req.userId);
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
};
module.exports = userDetails;
