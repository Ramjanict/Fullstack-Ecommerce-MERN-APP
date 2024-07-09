const addToCartModel = require("../../models/addToCartModel");
const updateAddToCartProduct = async (req, res) => {
  try {
    const addToCardProductId = req.body._id;
    const qty = req.body.quantity;
    const updateProduct = await addToCartModel.updateOne(
      { _id: addToCardProductId },
      {
        ...(qty && { quantity: qty }),
      }
    );
    res.json({
      data: updateProduct,
      message: "product update",
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

module.exports = updateAddToCartProduct;
