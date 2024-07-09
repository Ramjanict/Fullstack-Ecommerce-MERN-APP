import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import App from "../App";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/ForgotPassword";
import SignUp from "../Pages/SignUp";
import AdminPanel from "../Pages/AdminPanel";
import AllUsers from "../Pages/AllUsers";
import AllProducts from "../Pages/AllProducts";
import ProductCategory from "../Pages/ProductCategory";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import SearchProduct from "../Pages/SearchProduct";
import Success from "../Pages/Success";
import Cancel from "../Pages/Cancel";
import Order from "../Pages/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "product-category", element: <ProductCategory /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "success", element: <Success /> },
      { path: "cancel", element: <Cancel /> },
      { path: "order", element: <Order /> },

      { path: "search", element: <SearchProduct /> },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          { path: "all-uers", element: <AllUsers /> },
          { path: "all-products", element: <AllProducts /> },
        ],
      },
    ],
  },
]);
export default router;
