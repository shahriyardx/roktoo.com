import { createSlice } from "@reduxjs/toolkit";

export const donatorSlice = createSlice({
  name: "donators",
  initialState: [],
  reducers: {
    setDonators: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setDonators } = donatorSlice.actions;
export default donatorSlice.reducer;
