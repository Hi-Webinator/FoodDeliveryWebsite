import { combineReducers, configureStore } from '@reduxjs/toolkit';

import cartReducer from '../features/cart/cartSlice';
import persistCartMiddleware from './persistCartMiddleware';
import { IS_DEV } from '../constants/config';

/**
 * Kept separate from `store` so `RootState` (in ./types) can be derived from
 * the reducer shape instead of `store.getState`. Deriving it from the store
 * itself is circular: `persistCartMiddleware` needs `RootState`, and `store`'s
 * inferred type depends on the middleware array that includes it.
 */
export const rootReducer = combineReducers({
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistCartMiddleware),
  devTools: IS_DEV,
});


export default store;
