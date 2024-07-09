import React, { useContext, useState } from "react";
import ramjan from "../assets/logo/ramjan.png";
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ApiSummary from "../BackendUrl/backendUrl";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../Role/role";
import ContextApi from "../Context/Contex";

const Header = () => {
  const [displayMenu, setdisplayMenu] = useState(false);
  const user = useSelector((state) => state.user.user);
  const { cartProductCount } = useContext(ContextApi);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchinput = useLocation();
  const [search, setSearch] = useState(searchinput.search.split("=")[1]);

  const handleLogout = async () => {
    const responseData = await fetch(ApiSummary.logout_user.url, {
      credentials: "include",
    });
    const data = await responseData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(""));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate(`/search`);
    }
  };
  return (
    <header className="bg-white h-16 shadow-md fixed w-full z-40 ">
      <div className="  container mx-auto h-full flex items-center px-4 justify-between">
        <div className="h-full ">
          <Link to="/">
            <img className="h-full py-1" src={ramjan} alt="logo" />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="search Products here..."
            className="outline-none w-full pl-2"
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 flex justify-center items-center bg-red-600 rounded-r-full">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user._id && (
              <div
                onClick={() => setdisplayMenu((prev) => !prev)}
                className="text-3xl cursor-pointer relative flex justify-center"
              >
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user.name}
                  />
                ) : (
                  <FaRegUserCircle />
                )}
              </div>
            )}
            {displayMenu && (
              <div className="absolute z-10 bg-white py-2 px-4 bottom-0 top-12 h-fit  shadow-lg rounded">
                <nav>
                  {user.role === ROLE.ADMIN && (
                    <Link
                      to={"admin-panel/all-products"}
                      className="whitespace-nowrap hover:bg-slate-100 px-2 "
                      onClick={() => setdisplayMenu((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
                <nav>
                  <Link className="whitespace-nowrap hover:bg-slate-100 px-2 ">
                    User Panel
                  </Link>
                </nav>
              </div>
            )}
          </div>
          {user._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-red-600 w-5 h-5 rounded-full p-1 flex items-center justify-center text-white absolute -top-2 -right-3">
                <p className="text-sm">{cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user._id ? (
              <button
                onClick={handleLogout}
                className="text-white px-3 py-1 rounded-full bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-white px-3 py-1 rounded-full bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
