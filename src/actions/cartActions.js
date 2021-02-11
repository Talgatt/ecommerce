import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  console.log("im here", productId);
  const { data } = await Axios.get(`/api/products/${productId}`);

  console.log("JSON");
  console.log(getState().cart.cartItems);
  console.log("data", data);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      category: data.category,
      countInStock: data.countInStock,
      brand: data.brand,
      description: data.description,
      image: data.image,
      price: data.price,
      rating: data.rating,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
