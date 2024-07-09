// const backendUrl = "http://localhost:8080";

const backendUrl = "https://fullstack-ecommerce-mern-app.vercel.app";

const ApiSummary = {
  signup: {
    url: `${backendUrl}/api/signup`,
    method: "post",
  },
  login: {
    url: `${backendUrl}/api/login`,
    method: "post",
  },
  current_user: {
    url: `${backendUrl}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendUrl}/api/user-logout`,
    method: "get",
  },
  all_users: {
    url: `${backendUrl}/api/all-users`,
    method: "get",
  },
  update_user: {
    url: `${backendUrl}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendUrl}/api/upload-product`,
    method: "post",
  },
  AllProduct: {
    url: `${backendUrl}/api/get-product`,
    method: "get",
  },
  updateaProduct: {
    url: `${backendUrl}/api/update-product`,
    method: "post",
  },
  delteAdminProduct: {
    url: `${backendUrl}/api/delete-admin-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendUrl}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendUrl}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendUrl}/api/product-details`,
    method: "post",
  },
  addtocart: {
    url: `${backendUrl}/api/addtocart`,
    method: "post",
  },
  countAddToCart: {
    url: `${backendUrl}/api/countAddToCart`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendUrl}/api/view-card-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendUrl}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendUrl}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendUrl}/api/search`,
    method: "get",
  },
  filter_product: {
    url: `${backendUrl}/api/filter-product`,
    method: "post",
  },
  payment: {
    url: `${backendUrl}/api/checkout`,
    method: "post",
  },
};
export default ApiSummary;
