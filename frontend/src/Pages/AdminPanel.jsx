import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../Role/role";
const AdminPanel = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className=" md:flex hidden">
      <aside className="bg-white  w-full min-h-full max-w-60 customShadow">
        <div className=" h-32 flex flex-col justify-center items-center">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user.name}
              />
            ) : (
              <FaRegUserCircle />
            )}
          </div>
          <p className="capitalize text-lg font-semibold ">{user.name}</p>
          <p className="text-sm">{user.role}</p>
        </div>
        <div>
          <nav className="grid p-4">
            <Link to={"all-uers"} className="px-2 py-1 hover:bg-slate-100">
              Alll Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
