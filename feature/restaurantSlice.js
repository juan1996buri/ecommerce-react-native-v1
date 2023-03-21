import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  restaurant: {},
};
const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    addRestaurant: (state, action) => {
      const { restaurant } = action.payload;
      state.restaurant = restaurant;
    },
  },
});

export const { addRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
