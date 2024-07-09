import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiSummary from "../BackendUrl/backendUrl";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import CategoryWiseProductDisplay from "../Components/CategoryWiseProductDisplay";
import AddToCard from "../../helper/AddToCard";
import ContextApi from "../Context/Contex";

const ProductDetails = () => {
  const { fetchAddToCart } = useContext(ContextApi);
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const LoadingList = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCooridinate, setZoomImageCooridinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const navigate = useNavigate();
  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCooridinate({
        x: x,
        y: y,
      });
    },
    [zoomImageCooridinate]
  );
  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleMouseEnterProduct = (imageurl) => {
    setActiveImage(imageurl);
  };

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(ApiSummary.productDetails.url, {
      method: ApiSummary.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataReponse = await response.json();
    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);
  //parameter change will occur fetch
  const handleAddToCart = (e, id) => {
    AddToCard(e, id);
    fetchAddToCart();
  };
  const handleBuyProduct = (e, id) => {
    AddToCard(e, id);
    fetchAddToCart();
    navigate("/cart");
  };
  return (
    <div className="container p-4 mx-auto">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="w-[300px] h-[300px] lg:w-96 lg:h-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
              className="w-full h-full object-scale-down mix-blend-multiply cursor-grab"
            />
            {/**Product zoom */}

            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 top-0 -right-[510px] overflow-hidden">
                <div
                  className="w-full h-full min-w-[500px] min-h-[400px] mix-blend-multiply  scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCooridinate.x * 100}% ${
                      zoomImageCooridinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className=" flex gap-2 lg:flex-col overflow-scroll scrollbar">
                {LoadingList.map((el, i) => {
                  return (
                    <div
                      className="w-20 h-20 bg-slate-200 rounded animate-pulse"
                      key={i}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className=" flex gap-2 lg:flex-col overflow-scroll scrollbar">
                {data.productImage.map((imageurl, index) => {
                  return (
                    <div
                      className="w-20 h-20 bg-slate-200 rounded "
                      key={index}
                    >
                      <img
                        onClick={() => {
                          handleMouseEnterProduct(imageurl);
                        }}
                        onMouseEnter={() => {
                          handleMouseEnterProduct(imageurl);
                        }}
                        src={imageurl}
                        className="w-full h-full object-scale-down mix-blend-multiply  cursor-pointer  transition-all "
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/**Product details */}

        {loading ? (
          <div className="flex flex-col w-full  space-y-4">
            <p className="bg-slate-200 rounded-full h-6 lg:h-8 w-full animate-pulse"></p>
            <h2 className="bg-slate-200 rounded-full h-6 lg:h-8 w-full animate-pulse"></h2>
            <p className="bg-slate-200 rounded-full h-6 lg:h-8 w-full animate-pulse"></p>

            <div className="bg-slate-200 rounded-full h-6 lg:h-8 w-full animate-pulse"></div>

            <div className="flex  gap-5 ">
              <p className="bg-slate-200 rounded-full h-6 lg:h-8 w-full animate-pulse"></p>
              <p className="bg-slate-200 rounded-full h-6 lg:h-8 w-full animate-pulse"></p>
            </div>
            <div className="flex  gap-6 ">
              <button className=" bg-slate-200 rounded-full h-6 lg:h-8 w-full animate-pulse"></button>
              <button className="bg-slate-200 rounded-full h-6 lg:h-8 w-full animate-pulse"></button>
            </div>
            <div className="space-y-4">
              <p className="bg-slate-200 rounded-full h-6 lg:h-8 w-full animate-pulse"></p>
              <p className="bg-slate-200 rounded-full h-6 lg:h-8 w-full animate-pulse"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col  gap-1">
            <p className="bg-red-200 text-red-600 rounded-full px-2 w-fit">
              {data.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data.productName}
            </h2>
            <p className="capitalize text-slate-400 ">{data.category}</p>

            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center font-medium gap-5 text-2xl lg:text-3xl my-1">
              <p className="text-red-600">${data.sellingPrice}</p>
              <p className="text-slate-400 line-through">${data.price}</p>
            </div>
            <div className="flex items-center gap-6 my-3">
              <button
                onClick={(e) => {
                  handleBuyProduct(e, data._id);
                }}
                className=" font-medium border-2 border-red-600 px-3 py-1 min-w-[120px] text-red-600 hover:bg-red-600 hover:text-white rounded transition-all"
              >
                Buy
              </button>
              <button
                onClick={(e) => {
                  handleAddToCart(e, data._id);
                }}
                className=" font-medium border-2 border-red-600 px-3 py-1 min-w-[120px] text-white bg-red-600 hover:text-red-600 hover:bg-white rounded transition-all"
              >
                Add to Cart
              </button>
            </div>
            <div className="text-slate-600 font-medium my-1">
              <p>Description :</p>
              <p>{data.description}</p>
            </div>
          </div>
        )}
      </div>
      {data.category && (
        <CategoryWiseProductDisplay
          category={data.category}
          heading={"Recommended product"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
