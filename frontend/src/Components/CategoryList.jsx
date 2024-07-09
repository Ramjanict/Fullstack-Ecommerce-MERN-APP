import React, { useEffect, useState } from "react";
import ApiSummary from "../BackendUrl/backendUrl.js";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(13).fill(null);

  const fetchCategory = async () => {
    const fecthData = await fetch(ApiSummary.categoryProduct.url);
    setLoading(true);
    const responsedata = await fecthData.json();
    setLoading(false);
    if (responsedata.success) {
      setCategoryProduct(responsedata.data);
    }
    if (responsedata.error) {
      toast.error(responsedata.message);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 items-center justify-between scrollbar">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  key={index}
                  className="w-16 h-16 md:h-20 md:w-20 bg-slate-200 rounded-full overflow-hidden animate-pulse "
                ></div>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/product-category?category=" + product.category}
                  className="md:cursor-pointer"
                  key={index}
                >
                  <div className=" w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-slate-200 p-4 rounded-full overflow-hidden">
                    <img
                      className=" h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                      src={product?.productImage[0]}
                      alt={product?.category}
                      key={index}
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize ">
                    {product.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
