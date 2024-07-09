const addToCartModel = require("../../models/addToCartModel");

const addToCartViewProduct = async (req, res) => {
  try {
    currentUser = req.userId;
    const allproduct = await addToCartModel
      .find({
        userId: currentUser,
      })
      .populate("productId");

    res.json({
      data: allproduct,
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
module.exports = addToCartViewProduct;
