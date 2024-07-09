import React, { useEffect, useState } from "react";
import UploadProducts from "../Components/UploadProducts";
import ApiSummary from "../BackendUrl/backendUrl";
import AdminProductCart from "../Components/AdminProductCart";

const AllProducts = () => {
  const [openUploadProduct, setUploadProduct] = useState(false);
  const [allproducts, setAllproducts] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(ApiSummary.AllProduct.url);
    const dataResponse = await response.json();

    setAllproducts(dataResponse.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white flex justify-between px-4 py-2 items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          onClick={() => {
            setUploadProduct(true);
          }}
          className="px-3 py-1 border-2 border-red-600 hover:bg-red-600
         hover:text-white rounded-full transition-all "
        >
          Upload Product
        </button>
      </div>
      {/*All Product*/}

      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allproducts.map((product, index) => {
          return (
            <AdminProductCart
              data={product}
              key={index}
              fetchAllProduct={fetchAllProduct}
            />
          );
        })}
      </div>

      {/*Upload Product*/}

      {openUploadProduct && (
        <UploadProducts
          fetchAllProduct={fetchAllProduct}
          onClose={() => {
            setUploadProduct(false);
          }}
        />
      )}
    </div>
  );
};

export default AllProducts;
