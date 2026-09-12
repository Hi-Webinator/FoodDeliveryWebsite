import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createOrder } from '../services/orderService';
import { clearCart, selectOrderItems, selectTotalPrice } from '../features/cart/cartSlice';
import { normalizeWhitespace, sanitizePhone } from '../utils/sanitize';
import { MESSAGES } from '../constants/config';

const IDLE = { isSubmitting: false, error: null, fieldErrors: [], order: null };

/**
 * Submits the cart as an order and clears it on success.
 *
 * TS: `(): { submitOrder: (form: OrderFormValues) => Promise<boolean>;
 *      isSubmitting: boolean; error: string | null;
 *      fieldErrors: ValidationIssue[]; order: Order | null; reset: () => void }`
 */
export const useOrder = () => {
  // TS: type this dispatch as `AppDispatch`
  const dispatch = useDispatch();
  const items = useSelector(selectOrderItems);
  const totalPrice = useSelector(selectTotalPrice);

  const [state, setState] = useState(IDLE);

  const reset = useCallback(() => setState(IDLE), []);

  const submitOrder = useCallback(
    async (form) => {
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
        setState({
          ...IDLE,
          error: apiError?.message ?? MESSAGES.ORDER_ERROR,
          fieldErrors: apiError?.errors ?? [],
        });
        return false;
      }
    },
    [dispatch, items, totalPrice],
  );

  return { ...state, submitOrder, reset };
};

export default useOrder;
