import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import donatorReducer from "./donator";

const makeStore = () => {
  return configureStore({
    reducer: {
      donator: donatorReducer,
    },
  });
};

const wrapper = createWrapper(makeStore);
export default wrapper;
