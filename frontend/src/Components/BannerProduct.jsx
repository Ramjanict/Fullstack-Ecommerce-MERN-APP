import React, { useEffect, useState } from "react";

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

import image1 from "../assets/banner/img1.webp";
import image2 from "../assets/banner/img2.webp";
import image3 from "../assets/banner/img3.jpg";
import image4 from "../assets/banner/img4.jpg";
import image5 from "../assets/banner/img5.webp";

import image1Mobile from "../assets/banner/img1_mobile.jpg";
import image2Mobile from "../assets/banner/img2_mobile.webp";
import image3Mobile from "../assets/banner/img3_mobile.jpg";
import image4Mobile from "../assets/banner/img4_mobile.jpg";
import image5Mobile from "../assets/banner/img5_mobile.png";

const desktopImage = [image1, image2, image3, image4, image5];
const mobileImage = [
  image1Mobile,
  image2Mobile,
  image3Mobile,
  image4Mobile,
  image5Mobile,
];

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    //desktopImage.length=5
    if (desktopImage.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };
  const prevImage = () => {
    //desktopImage.length=5
    if (currentImage != 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImage.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);
  return (
    <div className="container mx-auto p-4 rounded">
      <div className=" h-56 md:h-72 w-full bg-slate-200 relative">
        <div className="h-full w-full hidden absolute z-10 md:flex items-center ">
          <div className="w-full flex justify-between text-2xl">
            <button
              onClick={prevImage}
              className="bg-white p-1 rounded-full shadow-md"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white p-1 rounded-full shadow-md"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/**Desktop imagages */}
        <div className="hidden md:flex w-full h-full overflow-hidden">
          {desktopImage.map((image, index) => {
            return (
              <div className="min-w-full min-h-full transition-all" key={index}>
                <img
                  style={{ transform: `translateX(-${currentImage * 100}%)` }}
                  className="h-full w-full"
                  src={image}
                  alt="banner"
                />
              </div>
            );
          })}
        </div>
        {/**mobile imagages */}
        <div className="flex md:hidden w-full h-full overflow-hidden">
          {mobileImage.map((image, index) => {
            return (
              <div className="min-w-full min-h-full transition-all" key={index}>
                <img
                  style={{ transform: `translateX(-${currentImage * 100}%)` }}
                  className="h-full w-full object-cover "
                  src={image}
                  alt="banner"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
