const userLogout = (req, res) => {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("token", tokenOption);
    res.status(201).json({
      data: [],
      success: true,
      error: false,
      message: "User Logout Successfully!",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = userLogout;
