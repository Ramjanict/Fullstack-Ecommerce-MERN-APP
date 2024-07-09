import React, { useContext, useEffect, useState } from "react";
import ApiSummary from "../BackendUrl/backendUrl";
import ContextApi from "../Context/Contex";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cartProductCount, fetchAddToCart } = useContext(ContextApi);
  const loadingCart = new Array(cartProductCount).fill(null);

  const fetchUserCart = async () => {
    //setLoading(true);
    const fetchData = await fetch(ApiSummary.addToCartProductView.url, {
      method: ApiSummary.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    //setLoading(false);
    const responseData = await fetchData.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, []);
  const increaseQty = async (id, qty) => {
    const fetchData = await fetch(ApiSummary.updateCartProduct.url, {
      method: ApiSummary.updateCartProduct.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        quantity: qty + 1,
        _id: id,
      }),
    });
    const responseData = await fetchData.json();
    if (responseData.data) {
      fetchUserCart();
    }
  };
  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const fetchData = await fetch(ApiSummary.updateCartProduct.url, {
        method: ApiSummary.updateCartProduct.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });
      const responseData = await fetchData.json();
      if (responseData.data) {
        fetchUserCart();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const fetchData = await fetch(ApiSummary.deleteCartProduct.url, {
      method: ApiSummary.deleteCartProduct.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const responseData = await fetchData.json();
    if (responseData.data) {
      fetchUserCart();
      fetchAddToCart();
    }
  };
  const totalQty = data.reduce((previousVale, currentValue) => {
    return previousVale + currentValue.quantity;
  }, 0);
  const totalPrice = data.reduce((previousVale, currentValue) => {
    return (
      previousVale + currentValue.quantity * currentValue.productId.sellingPrice
    );
  }, 0);
  // const totalPrice = data.reduce(
  //   (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
  //   0
  // );

  const handlePayment = async () => {
    const stripePromise = await loadStripe("pk_test_HQNnZInlzJ1JhfF2CaLXSPXv");

    const fetchData = await fetch(ApiSummary.payment.url, {
      method: ApiSummary.payment.method,
      mode: ApiSummary.payment.mode,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        cartItems: data,
      }),
    });
    const responseData = await fetchData.json();
    if (responseData.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3 rounded-sm">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>
      {/**viewcard */}
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el, index) => {
                return (
                  <div
                    key={index + "add to cart"}
                    className="w-full h-32 bg-slate-200 rounded my-2 border border-slate-300 animate-pulse"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={index + "add to cart product"}
                    className="w-full h-32 bg-white rounded my-2 border border-slate-300 grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200 flex  justify-center p-1">
                      <img
                        src={product.productId.productImage[0]}
                        className="w-ful h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-1.5 relative">
                      {/**delete product */}
                      <div
                        onClick={() => {
                          deleteCartProduct(product._id);
                        }}
                        className="text-xl absolute right-2 p-2 text-red-600 hover:bg-red-600 rounded-full hover:text-white cursor-pointer"
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product.productId.productName}
                      </h2>
                      <p className=" capitalize text-slate-500">
                        {product.productId.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-red-600 text-lg font-medium">
                          ${product.productId.sellingPrice}
                        </p>
                        <p className="text-slate-600 text-lg font-medium">
                          ${product.productId.sellingPrice * product.quantity}
                        </p>
                      </div>
                      <div className="mt-2 space-x-2">
                        <button
                          onClick={() => {
                            decreaseQty(product._id, product.quantity);
                          }}
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded py-.5 px-3"
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          onClick={() => {
                            increaseQty(product._id, product.quantity);
                          }}
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded py-.5 px-3"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        {/**Summary */}
        {/**cartProductCount != 0  */}
        {data[0] && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 rounded animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className=" text-white px-3 py-1 bg-red-600">Summary</h2>
                <div className="flex items-center justify-between text-slate-600 text-lg px-2 font-medium gap-2 ">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <div className="flex items-center justify-between text-slate-600 text-lg px-2 font-medium gap-2">
                  <p>Total Price</p>
                  <p>${totalPrice}</p>
                </div>
                <button
                  onClick={handlePayment}
                  className="bg-blue-600 p-2 w-full text-white mt-2"
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
