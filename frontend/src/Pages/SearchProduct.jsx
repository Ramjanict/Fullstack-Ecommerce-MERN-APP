import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ApiSummary from "../BackendUrl/backendUrl";
import SearchCard from "../Components/SearchCard";

const SearchProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = useLocation();
  const fetchProductBySearch = async () => {
    setLoading(true);
    const fetchdata = await fetch(ApiSummary.searchProduct.url + query.search);
    const responseData = await fetchdata.json();
    setLoading(false);
    setData(responseData.data);
  };
  useEffect(() => {
    fetchProductBySearch();
  }, [query]);
  return (
    <div className="container p-4 mx-auto">
      {loading && <p className="text-lg text-center ">Loadind Reasult...</p>}
      <p className="text-lg font-semibold my-3">
        Search Reasult : {data.length}
      </p>
      {data.length === 0 && !loading && (
        <p className="text-lg text-center text-white p-4">No data found...</p>
      )}
      {data.length !== 0 && !loading && (
        <SearchCard data={data} loading={loading} />
      )}
    </div>
  );
};

export default SearchProduct;
