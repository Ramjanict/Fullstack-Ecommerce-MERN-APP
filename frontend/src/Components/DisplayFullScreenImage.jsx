import React from "react";
import { CgClose } from "react-icons/cg";
const DisplayFullScreenImage = ({ onClose, imgeUrl }) => {
  return (
    <div className="fixed top-10  bottom-0 right-0 left-0 flex justify-center items-center z-50">
      <div className="bg-white rounded p-4 shadow-lg ">
        <div
          onClick={onClose}
          className="text-2xl cursor-pointer hover:text-red-600 w-fit ml-auto"
        >
          <CgClose />
        </div>
        <div className="max-w-[80vh] max-h-h-[80vh] ">
          <img className="w-full h-full" src={imgeUrl} alt="" />
        </div>
      </div>
    </div>
  );
};

export default DisplayFullScreenImage;
