const productModel = require("../../models/productModel");
const deleteAdminProduct = async (req, res) => {
  try {
    const AdminProduct = req.body._id;

    const deleteAdminProduct = await productModel.deleteOne({
      _id: AdminProduct,
    });
    res.json({
      data: deleteAdminProduct,
      message: "Admin product delete",
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

module.exports = deleteAdminProduct;
