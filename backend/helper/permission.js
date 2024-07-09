const userModel = require("../models/userModel");

const productUploadPermission = async (userId) => {
  const user = await userModel.findById(userId);

  if (user.role === "ADMIN") {
    return true;
  }

  return false;
};

module.exports = productUploadPermission;
