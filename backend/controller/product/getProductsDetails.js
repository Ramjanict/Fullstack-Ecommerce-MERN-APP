const productModel = require("../../models/productModel");

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);

    res.status(201).json({
      data: product,
      message: "Ok",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(401).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductDetails;
