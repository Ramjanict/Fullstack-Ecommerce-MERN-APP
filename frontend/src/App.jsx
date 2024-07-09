import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiSummary from "./BackendUrl/backendUrl";
import ContextApi from "./Context/Contex";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
const App = () => {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCart] = useState(0);

  //user detals
  const fetchUserDetails = async (req, res) => {
    const dataResponse = await fetch(ApiSummary.current_user.url, {
      method: ApiSummary.current_user.method,
      credentials: "include",
    });
    const userData = await dataResponse.json();
    if (userData.success) {
      dispatch(setUserDetails(userData.data));
    }
  };

  //user cart count
  const fetchAddToCart = async (req, res) => {
    const dataResponse = await fetch(ApiSummary.countAddToCart.url, {
      method: ApiSummary.countAddToCart.method,
      credentials: "include",
    });
    const userData = await dataResponse.json();
    if (userData.success) {
      setCartProductCart(userData.data.count);
    }
  };
  useEffect(() => {
    fetchUserDetails();
    fetchAddToCart();
  }, []);
  return (
    <>
      <ContextApi.Provider
        value={{ fetchUserDetails, cartProductCount, fetchAddToCart }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-56px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </ContextApi.Provider>
    </>
  );
};

export default App;
