import React from "react";
import successImg from "../../src/assets/success.gif";
import { Link } from "react-router-dom";
const Success = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto p-4 my-2 rounded flex flex-col justify-center items-center ">
      <img
        className="mix-blend-multiply"
        width={150}
        height={150}
        src={successImg}
      />
      <p className="text-green-600 font-bold text-xl">Payment Successfully</p>
      <Link
        to={"/order"}
        className="my-4 px-3 py-1 border-2 border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition-all"
      >
        See Order
      </Link>
    </div>
  );
};

export default Success;
