import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices";
var store = configureStore({ reducer: reducer.reducer });
export default store;