import ApiSummary from "../src/BackendUrl/backendUrl";

const FetchCategoryWiseProduct = async (category) => {
  const fetchdata = await fetch(ApiSummary.categoryWiseProduct.url, {
    method: ApiSummary.categoryWiseProduct.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  });
  const responData = await fetchdata.json();
  return responData;
};

export default FetchCategoryWiseProduct;
