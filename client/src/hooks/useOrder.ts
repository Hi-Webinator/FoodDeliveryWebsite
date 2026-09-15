import { useCallback, useState } from 'react';

import { createOrder } from '../services/orderService';
import { clearCart, selectOrderItems, selectTotalPrice } from '../features/cart/cartSlice';
import { normalizeWhitespace, sanitizePhone } from '../utils/sanitize';
import { MESSAGES } from '../constants/config';
import { useAppDispatch, useAppSelector } from './hooks';
import type { ValidationIssue, MenuItem } from '../store/types';
import type { NormalizedApiError } from '../services/api';

interface OrderFormValues {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
}

type OrderState = {
  isSubmitting: boolean;
  error: string | null;
  fieldErrors: ValidationIssue[];
  order: MenuItem[] | null;
};

const IDLE: OrderState = { isSubmitting: false, error: null, fieldErrors: [], order: null };

/** Submits the cart as an order and clears it on success. */

export const useOrder = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectOrderItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const [state, setState] = useState(IDLE);

  const reset = useCallback(() => setState(IDLE), []);

  const submitOrder = useCallback(
    async (form: OrderFormValues) => {
      if (items.length === 0) {
        setState({ ...IDLE, error: MESSAGES.CART_EMPTY });
        return false;
      }

      setState({ ...IDLE, isSubmitting: true });

      try {
        const { order } = await createOrder({
          customerName: normalizeWhitespace(form.customerName),
          customerPhone: sanitizePhone(form.customerPhone),
          deliveryAddress: normalizeWhitespace(form.deliveryAddress),
          items,
          totalPrice,
        });

        dispatch(clearCart());
        setState({ ...IDLE, order });
        return true;
      } catch (apiError) {
        const normalized = apiError as NormalizedApiError;
        setState({
          ...IDLE,
          error: normalized?.message ?? MESSAGES.ORDER_ERROR,
          fieldErrors: normalized?.errors ?? [],
        });
        return false;
      }
    },
    [dispatch, items, totalPrice],
  );

  return { ...state, submitOrder, reset };
};

export default useOrder;
