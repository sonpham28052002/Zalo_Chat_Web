import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./slices";

const persistConfig = {
  key: "root",
  storage,
};

// Tạo reducer đã lưu trữ
const persistedReducer = persistReducer(persistConfig, reducer.reducer);

// Tạo cửa hàng Redux
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);

export { store, persistor };
