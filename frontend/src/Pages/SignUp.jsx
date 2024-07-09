import React, { useState } from "react";
import signup from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../../helper/ImageToBase64";
import { toast } from "react-toastify";
import ApiSummary from "../BackendUrl/backendUrl";

const SignUp = () => {
  const [showPasswod, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const handleOnchane = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);

    setData((prev) => {
      return { ...prev, profilePic: imagePic };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      //http://localhost:8080";
      const postData = await fetch(`${ApiSummary.signup.url}`, {
        method: ApiSummary.signup.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await postData.json();
      if (responseData.success) {
        toast.success(responseData.message);
        navigate("/login");
      }
      if (responseData.error) {
        toast.error(responseData.message);
      }
    } else {
      toast.error("Please check the password and confirm password");
    }
  };

  return (
    <div id="login">
      <div className="container mx-auto p-4">
        <div className="max-w-sm mx-auto w-full bg-white p-5">
          <div className="w-20 h-20 rounded-full mx-auto relative overflow-hidden">
            <div>
              <img src={data.profilePic || signup} alt="signin icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 w-full pb-4 pt-2 absolute bottom-0 text-center cursor-pointer">
                  Upload photo
                </div>
                <input type="file" hidden onChange={handleUploadPic} />
              </label>
            </form>
          </div>
          <form onSubmit={handleSubmit} className="pt-6 flex flex-col gap-2">
            <div>
              <label htmlFor="name">Name</label>
              <div className="bg-slate-100 p-2">
                <input
                  onChange={handleOnchane}
                  name="name"
                  value={data.name}
                  className="w-full h-full outline-none bg-transparent"
                  type="text"
                  placeholder="Enter your name..."
                  id="name"
                  required
                />
              </div>
            </div>
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
            </div>
            <div>
              <label htmlFor="confirm">Confirm password</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  onChange={handleOnchane}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  className="w-full h-full outline-none bg-transparent"
                  type={confirmPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  id="confirm"
                  required
                />
                <div
                  className="cursor-pointer text-2xl"
                  onClick={() => setConfirmPassword((pv) => !pv)}
                >
                  <span>{confirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
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
              Sign up
            </button>
          </form>
          <p className="py-4">
            Already have account ? {""}
            <Link
              to="/login"
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
