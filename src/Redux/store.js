import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import userReducer from "../Redux/features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([userApi.middleware]),
});
