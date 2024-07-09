import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../../helper/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from "../../helper/UploadImage";
import DisplayFullScreenImage from "./DisplayFullScreenImage";
import { MdDelete } from "react-icons/md";
import ApiSummary from "../BackendUrl/backendUrl";
import { toast } from "react-toastify";

const UploadProducts = ({ onClose, fetchAllProduct }) => {
  const [openFullImage, setOpenFullImage] = useState(false);
  const [urlFullImage, setUrlFullImage] = useState("");
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const cloudinaryImage = await UploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, cloudinaryImage.url],
      };
    });
  };

  const handleDeleteimage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const fetchdata = await fetch(ApiSummary.uploadProduct.url, {
      method: ApiSummary.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await fetchdata.json();
    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      fetchAllProduct();
    }
    if (responseData.error) {
      toast.error(responseData.message);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center w-full h-full bg-slate-200 bg-opacity-35">
      <div className="bg-white p-4 w-full h-full max-w-2xl max-h-[80%] rounded overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Upload product</h2>
          <div
            onClick={onClose}
            className="text-2xl cursor-pointer hover:text-red-600"
          >
            <CgClose />
          </div>
        </div>
        <form
          onSubmit={handleOnSubmit}
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
        >
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            className="p-2 bg-slate-100 border rounded "
            name="productName"
            value={data.productName}
            onChange={handleOnchange}
            placeholder="Enter product name ..."
            id="productName"
            required
          />
          <label htmlFor="brandName">Brand Name </label>
          <input
            type="text"
            className="p-2 bg-slate-100 border rounded "
            name="brandName"
            value={data.brandName}
            onChange={handleOnchange}
            placeholder="Enter brand name ..."
            id="brandName"
            required
          />
          <label htmlFor="category">Category </label>
          <select
            type="text"
            className="p-2 bg-slate-100 border rounded "
            name="category"
            value={data.category}
            onChange={handleOnchange}
            id="category"
            required
          >
            <option value="">Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={index}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage">Product Image</label>
          <label htmlFor="uploadImage">
            <div className=" h-48 p-2 bg-slate-100 w-full border rounded flex justify-center items-center cursor-pointer">
              <div className=" text-slate-500 flex flex-col items-center justify-center gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  onChange={handleUploadProduct}
                  type="file"
                  id="uploadImage"
                  hidden
                />
              </div>
            </div>
          </label>
          <div className="flex gap-2 items-center ">
            {data.productImage[0] ? (
              data.productImage.map((img, index) => {
                return (
                  <div key={index} className="relative group">
                    <img
                      onClick={() => {
                        setOpenFullImage(true);
                        setUrlFullImage(img);
                      }}
                      src={img}
                      alt={img}
                      width={80}
                      height={80}
                      className="bg-slate-100 border rounded cursor-pointer"
                    />
                    <div
                      className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full cursor-pointer hidden group-hover:block"
                      onClick={() => handleDeleteimage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-red-600 text-xs">
                * Please upload product image
              </p>
            )}
          </div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="p-2 bg-slate-100 border rounded "
            name="price"
            value={data.price}
            onChange={handleOnchange}
            placeholder="Input product price ..."
            id="price"
            required
          />
          <label htmlFor="sellingPrice">Selling Price</label>
          <input
            type="number"
            className="p-2 bg-slate-100 border rounded "
            name="sellingPrice"
            value={data.sellingPrice}
            onChange={handleOnchange}
            placeholder="Input selling Price ..."
            id="sellingPrice"
            required
          />
          <label htmlFor="description">Description</label>
          <textarea
            row={3}
            className="p-2 h-32 bg-slate-100 border rounded resize-none "
            name="description"
            value={data.description}
            onChange={handleOnchange}
            placeholder="Input product description ..."
            id="description"
            required
          />

          <button className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white my-5">
            Upload Product
          </button>
        </form>
      </div>

      {openFullImage && (
        <DisplayFullScreenImage
          onClose={() => {
            setOpenFullImage(false);
          }}
          imgeUrl={urlFullImage}
        />
      )}
    </div>
  );
};

export default UploadProducts;
