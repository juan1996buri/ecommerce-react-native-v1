import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  itemsList: [],
  count: 0,
  total: 0,
};
const bascketSlice = createSlice({
  name: "bascket",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { dish, count } = action.payload;
      const item = state.itemsList.find((item) => item._id === dish._id);

      state.count++;

      if (!item) {
        const newItem = {
          _id: dish._id,
          name: dish.name,
          short_description: dish.short_description,
          price: dish.price,
          image: dish.image,
          total: dish.price * count,
          count: count,
        };
        state.itemsList.push(newItem);
      } else {
        item.total = dish.price * count;
        item.count = count;
      }
    },
    removeItem: (state, action) => {
      const { dish, count } = action.payload;
      const product = state.itemsList.find((item) => item._id === dish._id);
      if (product) {
        if (count === 0) {
          state.count = state.count - product.count;
          const newList = state.itemsList.filter(
            (item) => item._id !== dish._id
          );
          state.itemsList = newList;
        } else {
          state.count--;
          product.total = dish.price * count;
          product.count = count;
        }
      }
    },
    getTotal: (state, action) => {
      state.total = state.itemsList.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.total;
      }, 0);
    },
  },
});

export const { addItem, removeItem, getTotal } = bascketSlice.actions;
export default bascketSlice.reducer;
