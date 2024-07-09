const addToCartModel = require("../../models/addToCartModel");
const deleteAddToCartProduct = async (req, res) => {
  try {
    const addToCardProductId = req.body._id;

    const deleteProduct = await addToCartModel.deleteOne({
      _id: addToCardProductId,
    });
    res.json({
      data: deleteProduct,
      message: "product delete",
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

module.exports = deleteAddToCartProduct;
