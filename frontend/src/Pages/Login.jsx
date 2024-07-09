import React, { useContext, useState } from "react";
import signin from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import ApiSummary from "../BackendUrl/backendUrl";
import { toast } from "react-toastify";
import ContextApi from "../Context/Contex";

const Login = () => {
  const [showPasswod, setShowPassword] = useState(false);
  const { fetchUserDetails, fetchAddToCart } = useContext(ContextApi);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnchane = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = await fetch(`${ApiSummary.login.url}`, {
      method: ApiSummary.login.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await postData.json();
    if (responseData.success) {
      toast.success(responseData.message);
      navigate("/");
      fetchUserDetails();
      fetchAddToCart();
    }
    if (responseData.error) {
      toast.error(responseData.message);
    }
  };

  return (
    <div id="login">
      <div className="container mx-auto p-4">
        <div className="max-w-sm mx-auto w-full bg-white p-5">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
            <img src={signin} alt="signin icons" />
          </div>
          <form onSubmit={handleSubmit} className="pt-6 flex flex-col gap-2">
            <div>
              <label htmlFor="email">Email</label>
              <div className="bg-slate-100 p-2">
                <input
                  onChange={handleOnchane}
                  name="email"
                  value={data.email}
                  className="w-full h-full outline-none bg-transparent"
                  type="email"
                  placeholder="Enter your email..."
                  id="email"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  onChange={handleOnchane}
                  name="password"
                  value={data.password}
                  className="w-full h-full outline-none bg-transparent"
                  type={showPasswod ? "text" : "password"}
                  placeholder="Enter your password..."
                  id="password"
                  required
                />
                <div
                  className="cursor-pointer text-2xl"
                  onClick={() => setShowPassword((pv) => !pv)}
                >
                  <span>{showPasswod ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="w-fit ml-auto block hover:underline hover:text-red-600"
              >
                Forgot password
              </Link>
            </div>
            <button className="bg-red-600 hover:bg-red-700 px-6 py-3 max-w-[150px] w-full mx-auto block my-4 rounded-full text-white hover:scale-110 transition-all">
              Login
            </button>
          </form>
          <p className="py-4">
            Don't have account ?{" "}
            <Link
              to="/sign-up"
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
