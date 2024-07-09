const userModel = require("../../models/userModel");

const updateUser = async (req, res) => {
  try {
    const sessionUser = req.userId;

    const { userId, email, name, role } = req.body;
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const user = await userModel.findById(sessionUser);
    const upDateuser = await userModel.findByIdAndUpdate(userId, payload);

    res.json({
      data: upDateuser,
      message: "Update user successfully",
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
module.exports = updateUser;
