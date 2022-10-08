import { API } from "../config";

export const getProducts = async (sortBy) => {
  try {
    const response = await fetch(
      `${API}/products?sortBy=${sortBy}&order=desc&limit=6`,
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${API}/categories`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const read = async (productId) => {
  try {
    const response = await fetch(`${API}/product/${productId}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
export const getFilteredProducts = async (skip, limit, filters = {}) => {
  const data = { limit, skip, filters };
  try {
    const response = await fetch(`${API}/products/by/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
