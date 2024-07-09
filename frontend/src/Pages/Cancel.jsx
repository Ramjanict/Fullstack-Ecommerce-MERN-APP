import React from "react";
import cancelImg from "../assets/cancel.gif";
import { Link } from "react-router-dom";
const Cancel = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto p-4 my-2 rounded flex flex-col justify-center items-center ">
      <img
        className="mix-blend-multiply"
        width={150}
        height={150}
        src={cancelImg}
      />
      <p className="text-red-600 font-bold text-xl my-1">Payment Cancel</p>
      <Link
        to={"/cart"}
        className="my-4 px-3 py-1 border-2 border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition-all"
      >
        Go To Cart
      </Link>
    </div>
  );
};

export default Cancel;
