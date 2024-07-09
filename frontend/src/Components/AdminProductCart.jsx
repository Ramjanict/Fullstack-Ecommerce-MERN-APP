import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import { MdDelete } from "react-icons/md";
import ApiSummary from "../BackendUrl/backendUrl";

const AdminProductCart = ({ data, fetchAllProduct }) => {
  const handleAdminProductDelete = async (id) => {
    const fetchData = await fetch(ApiSummary.delteAdminProduct.url, {
      method: ApiSummary.delteAdminProduct.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const responseData = await fetchData.json();
    if (responseData.data) {
      fetchAllProduct();
    }
  };
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded ">
      <div
        onClick={() => {
          handleAdminProductDelete(data._id);
        }}
        className="w-fit ml-auto bg-slate-200 text-red-600  hover:bg-red-600 rounded-full 
          p-2 cursor-pointer hover:text-white"
      >
        <MdDelete />
      </div>
      <div className="w-40">
        <div className="mx-auto w-32 h-32 flex justify-center items-center my-2">
          <img
            className=" object-fit h-full"
            src={data.productImage[0]}
            alt={data.brandName}
          />
        </div>
        <h1 className="text-ellipsis ">{data.brandName}</h1>
        <div>
          <p className="font-semibold ">${data.sellingPrice}</p>
          <div
            className="w-fit ml-auto bg-green-100 hover:bg-green-600 rounded-full 
          p-2 cursor-pointer hover:text-white"
          >
            <MdModeEditOutline
              onClick={() => {
                setEditProduct(true);
              }}
            />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productData={data}
          fetchAllProduct={fetchAllProduct}
          onClose={() => {
            setEditProduct(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminProductCart;
