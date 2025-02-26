import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/login/loginSlice";
import registerReducer from "./features/register/registerSlice";
import authReducer from "./features/auth/authSlice";
import productReducer from "./features/product/productSlice";
import userReducer from "./features/user/userSlice";
import { baseApi } from "./api/baseApi";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    product: productReducer,
    user: userReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: [
          "meta.arg.photo",
          "payload.photo",
          "meta.baseQueryMeta.request",
        ],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
