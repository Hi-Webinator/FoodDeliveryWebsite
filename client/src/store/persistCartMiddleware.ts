import { AnyAction, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';
import { saveCartItems } from '../utils/localStorage';
import type { RootState } from './types';

/** Only these actions can change `items`, so only they trigger a write. */
const PERSISTED_ACTIONS = new Set([
  'cart/addItem',
  'cart/removeItem',
  'cart/updateQuantity',
  'cart/clearCart',
]);

/**
 * Writes the cart to localStorage after any action that mutates it.
 * A hand-rolled middleware is enough here — redux-persist would add a
 * dependency and a rehydration lifecycle for a single slice.
 *
 * TS: `Middleware<{}, RootState>`
 */
const persistCartMiddleware =
  (store: MiddlewareAPI<Dispatch<AnyAction>, RootState>) =>
    (next: Dispatch<AnyAction>) =>
      (action: AnyAction) => {
        const result = next(action);

        if (PERSISTED_ACTIONS.has(action.type)) {
          saveCartItems(store.getState().cart.items);
        }

        return result;
      };

export default persistCartMiddleware;