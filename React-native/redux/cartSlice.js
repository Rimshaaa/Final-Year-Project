import { createSlice } from "@reduxjs/toolkit";
import { discount } from "../utils";

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    items: 0,
    total: 0,
  },
  reducers: {
    addCart: (state, { payload }) => {
      state.cart.push(payload);
      state.items += payload.qty;
      state.total += parseInt(payload.price) * parseInt(payload.qty);
    },
    incQuantity: (state, { payload }) => {
      const find = state.cart.find((item) => item._id === payload);
      if (find) {
        find.qty += 1;
        state.items += 1;
        state.total += parseInt(find.price);
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
      }
    },
    decQuantity: (state, { payload }) => {
      const find = state.cart.find((item) => item._id === payload);
      if (find && find.qty > 1) {
        find.qty -= 1;
        state.items -= 1;
        state.total -= parseInt(find.price);
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
      }
    },
    removeItem: (state, { payload }) => {
      const find = state.cart.find((item) => item._id === payload);
      if (find) {
        const index = state.cart.indexOf(find);
        state.items -= parseInt(find.qty);
        state.total -= parseInt(find.price) * parseInt(find.qty);
        state.cart.splice(index, 1);
      }
    },
    emptyCart: (state) => {
      state.cart = [];
      state.items = 0;
      state.total = 0;
    },
  },
});
export const { addCart, incQuantity, decQuantity, removeItem, emptyCart } =
  cartReducer.actions;
export default cartReducer.reducer;
