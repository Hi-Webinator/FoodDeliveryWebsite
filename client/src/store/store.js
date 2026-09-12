import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '../features/cart/cartSlice';
import persistCartMiddleware from './persistCartMiddleware';
import { IS_DEV } from '../constants/config';

// TS: after migration, export
//   `export type RootState = ReturnType<typeof store.getState>;`
//   `export type AppDispatch = typeof store.dispatch;`
// and add typed `useAppDispatch` / `useAppSelector` hooks.
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistCartMiddleware),
  devTools: IS_DEV,
});

export default store;
