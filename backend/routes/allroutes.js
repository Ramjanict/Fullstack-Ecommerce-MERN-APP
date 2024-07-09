const express = require("express");
const router = express.Router();
const userSignUp = require("../controller/user/userSignUp.js");
const userSignin = require("../controller/user/userSignIn.js");
const authToken = require("../middleware/authToken.js");
const userDetails = require("../controller/user/userDetails.js");
const allusers = require("../controller/user/allusers.js");
const userLogout = require("../controller/user/userLogout.js");
const updateUser = require("../controller/user/updateUser.js");
const uploadProduct = require("../controller/product/uploadProduct.js");
const getAllProduct = require("../controller/product/getAlproducts.js");
const updateProduct = require("../controller/product/updateProduct.js");
const getCategoryProductOne = require("../controller/product/getCategoryProductOne.js");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct.js");
const getProductDetails = require("../controller/product/getProductsDetails.js");
const addToCartController = require("../controller/user/addToCartController.js");
const countAddToCart = require("../controller/user/countAddToCart.js");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct.js");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct.js");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct.js");
const searchProduct = require("../controller/product/searchProduct.js");
const filterProduct = require("../controller/product/filterProduct.js");
const payment = require("../controller/order/payment.js");
const deleteAdminProduct = require("../controller/user/deleteAdminProduct.js");

//user Paner
router.post("/signup", userSignUp);
router.post("/login", userSignin);
router.get("/user-details", authToken, userDetails);
router.get("/user-logout", userLogout);

//admin panel
router.get("/all-users", authToken, allusers);
router.post("/update-user", authToken, updateUser);
router.post("/delete-admin-product", authToken, deleteAdminProduct);

//product
router.post("/upload-product", authToken, uploadProduct);
router.get("/get-product", getAllProduct);
router.post("/update-product", authToken, updateProduct);
router.get("/get-categoryProduct", getCategoryProductOne);
router.get("/get-categoryProduct", getCategoryProductOne);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProduct);

//user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCart", authToken, countAddToCart);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

//payment and order
router.post("/checkout", authToken, payment);

module.exports = router;
