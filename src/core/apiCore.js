import { API } from "../config";
import queryString from "query-string";

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

export const searchProducts = async (params) => {
  console.log(params);
  const query = queryString.stringify(params);
  console.log("query", query);
  try {
    const response = await fetch(`${API}/products/search?${query}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const readSinglePage = async (productId) => {
  try {
    const response = await fetch(`${API}/product/${productId}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// Related Product
export const listRelated = async (productId) => {
  try {
    const response = await fetch(`${API}/products/related/${productId}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

//Braintree
export const getBraintreeClientToken = async (userId, token) => {
  try {
    const response = await fetch(`${API}/braintree/getToken/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const processPayment = async (userId, token, paymentData) => {
  try {
    const response = await fetch(`${API}/braintree/payment/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (userId, token, createOrderData) => {
  try {
    const response = await fetch(`${API}/order/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ order: createOrderData }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// Related Product
export const reviewRelated = async (productId) => {
  try {
    const response = await fetch(`${API}/review/related/${productId}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getReview = async (reviewId) => {
  try {
    const response = await fetch(`${API}/review/${reviewId}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createReview = async (userId, token, createReviewData) => {
  try {
    const response = await fetch(`${API}/review/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: createReviewData,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
// router.put("/review/:reviewId/:userId", requireSignin, isAuth, update);

export const editReview = async (reviewId, userId, token, updateReviewData) => {
  try {
    const response = await fetch(`${API}/review/${reviewId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: updateReviewData,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async (reviewId, userId, token) => {
  try {
    const response = await fetch(`${API}/review/${reviewId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
