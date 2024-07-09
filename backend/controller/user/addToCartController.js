const addToCartModel = require("../../models/addToCartModel");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    currentUser = req.userId;
    const isProductAdded = await addToCartModel.findOne({
      productId,
      userId: currentUser,
    });
    if (isProductAdded) {
      return res.json({
        message: "Already exits in Add to cart",
        success: true,
        error: false,
      });
    }
    const payload = {
      userId: currentUser,
      productId: productId,
      quantity: 1,
    };
    const newProduct = new addToCartModel(payload);
    const saveProduct = await newProduct.save();
    res.json({
      message: "Product Added in Cart",
      data: saveProduct,
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
module.exports = addToCart;
