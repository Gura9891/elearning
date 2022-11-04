import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import productProducer from "./reducers/productProducer";
import userReducer from "./reducers/userReducer";
import productReducerAdmin from "./reducers/productReducerAdmin";
import userReducerAdmin from "./reducers/userReducerAdmin";

export const store = configureStore({
  reducer: {
    numberReducer: (state, action: PayloadAction<number>) => {
      return 1;
    },
    productProducer: productProducer,
    userReducer: userReducer,
    productReducerAdmin:productReducerAdmin,
    userReducerAdmin:userReducerAdmin
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
