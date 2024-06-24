import { configureStore } from "@reduxjs/toolkit";
import AddTaskReducer from "../AddTaskSlice";

const store = configureStore({
  reducer: {
    newTask: AddTaskReducer,
  },
});

export default store;
