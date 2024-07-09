import React, { useContext, useEffect, useRef, useState } from "react";
import FetchCategoryWiseProduct from "../../helper/FetchCategoryWiseProduct";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AddToCard from "../../helper/AddToCard";
import ContextApi from "../Context/Contex";
const VerticalCardProduct = ({ category, heading }) => {
  const [data, setdata] = useState([]);
  const [loading, setLoding] = useState(false);
  const loadingList = new Array(13).fill(null);
  const scrollElemnt = useRef();
  const { fetchAddToCart } = useContext(ContextApi);

  const scrollRight = () => {
    scrollElemnt.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElemnt.current.scrollLeft -= 300;
  };
  //fetch data
  const fetchData = async () => {
    setLoding(true);
    //responData=categoryProduct from function
    const categoryProduct = await FetchCategoryWiseProduct(category);
    setLoding(false);
    setdata(categoryProduct.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handAddTocart = async (e, id) => {
    await AddToCard(e, id);
    fetchAddToCart();
  };
  return (
    <div className="container mx-auto px-4 my-6  relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 scrollbar transition-all"
        ref={scrollElemnt}
      >
        <button
          onClick={scrollLeft}
          className="bg-white p-1 rounded-full shadow-md absolute left-0 text-lg hidden md:block"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={scrollRight}
          className="bg-white p-1 rounded-full shadow-md absolute right-0 text-lg hidden md:block"
        >
          <FaAngleRight />
        </button>
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div
                  key={index}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                >
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex items-center justify-center animate-pulse"></div>
                  <div className="p-4 grid gap-3">
                    <h2 className="bg-slate-200 animate-pulse p-2  rounded-full py-2"></h2>
                    <p className=" rounded-full bg-slate-200 animate-pulse p-2 py-2"></p>
                    <div className="flex gap-3  ">
                      <p className=" bg-slate-200 animate-pulse p-2  rounded-full py-2 w-full"></p>
                      <p className="bg-slate-200 animate-pulse p-2  rounded-full py-2 w-full"></p>
                    </div>
                    <button className=" px-3 py-2 my-3 rounded-full bg-slate-200 animate-pulse "></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"product/" + product?._id}
                  key={index}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                >
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex items-center justify-center animate-pulse">
                    <img
                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                      src={product.productImage[0]}
                      alt={product.brandName}
                    />
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product.category}
                    </p>
                    <div className="flex gap-3 justify-between ">
                      <p className=" text-slate-500  line-through">
                        ${product.price}
                      </p>
                      <p className="font-medium text-red-600">
                        ${product.sellingPrice}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        handAddTocart(e, product._id);
                      }}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 my-3 rounded-full text-sm text-white"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
