const addToCartModel = require("../../models/addToCartModel");

const countAddToCart = async (req, res) => {
  try {
    const userId = req.userId;

    const count = await addToCartModel.countDocuments({
      userId,
    });

    res.json({
      data: {
        count: count,
      },
      message: "ok",
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: false,
      success: false,
    });
  }
};

module.exports = countAddToCart;
