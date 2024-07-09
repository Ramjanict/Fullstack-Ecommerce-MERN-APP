const productUploadPermission = require("../../helper/permission");
const productModel = require("../../models/productModel");
const updateProduct = async (req, res) => {
  try {
    //from token
    const sessionUserId = req.userId;
    if (!productUploadPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }
    const { _id, ...resBody } = req.body;

    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);

    res.status(201).json({
      message: "Product update successfully",
      error: false,
      success: true,
      data: updateProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = updateProduct;
