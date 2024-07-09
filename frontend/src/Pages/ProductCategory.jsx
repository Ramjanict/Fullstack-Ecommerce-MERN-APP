import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../../helper/ProductCategory";
import SearchCard from "../Components/SearchCard";
import ApiSummary from "../BackendUrl/backendUrl";

const ProductCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListArray = urlSearch.getAll("category");
  const urlCategoryListObject = {};
  urlCategoryListArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });
  const [slectCategory, setSelectCategoy] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const handleSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
    if (value === "asc") {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (value === "dsc") {
      setData((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };
  useEffect(() => {}, [sortBy]);

  const fetchCategoryData = async () => {
    const fetchData = await fetch(ApiSummary.filter_product.url, {
      method: ApiSummary.filter_product.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const responseData = await fetchData.json();
    setData(responseData.data || []);
  };
  useEffect(() => {
    fetchCategoryData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayCategory = Object.keys(slectCategory)
      .map((categoryKey) => {
        if (slectCategory[categoryKey]) {
          return categoryKey;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(arrayCategory);
    //format url will change when the change checkbox
    const formatUrl = arrayCategory.map((el, index) => {
      if (arrayCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });
    navigate("/product-category?" + formatUrl.join(""));
  }, [slectCategory]);

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategoy((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  return (
    <div className="container mx-auto p-4">
      {/**Desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/**sortBy */}
          <div>
            <h3 className="text-base font-medium uppercase text-slate-500 border-b border-slate-300 p-1">
              sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sort"
                  value={"asc"}
                  checked={sortBy === "asc"}
                  onChange={handleSortBy}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sort"
                  checked={sortBy === "dsc"}
                  value={"dsc"}
                  onChange={handleSortBy}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>
          {/*filterby*/}
          <div>
            <h3 className="text-base font-medium uppercase text-slate-500 border-b border-slate-300 p-1">
              category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="category"
                      id={categoryName.value}
                      onChange={handleSelectCategory}
                      value={categoryName.value}
                      checked={setSelectCategoy[categoryName.value]}
                    />
                    <label htmlFor={categoryName.value}>
                      {categoryName.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/**right side */}
        <div className="px-4">
          <h2 className="font-medium text-lg my-2 text-slate-800 ">
            Search Results : {data.length}
          </h2>
          <div className="max-h-[calc(100vh-120px)] overflow-y-scroll min-h-[calc(100vh-120px)] ">
            {data.length !== 0 && !loading && (
              <SearchCard loading={loading} data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
