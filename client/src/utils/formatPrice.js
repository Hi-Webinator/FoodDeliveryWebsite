import { CURRENCY, LOCALE } from '../constants/config';

// Building an Intl formatter is comparatively expensive, so make it once.
const formatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
});

/**
 * Formats a number as currency. Non-numeric input renders as the zero amount
 * rather than "NaN", which would otherwise leak into the UI.
 *
 * TS: `(value: number) => string`
 */
export const formatPrice = (value) => {
  const amount = Number(value);
  return formatter.format(Number.isFinite(amount) ? amount : 0);
};

/**
 * Rounds to cents. Floating point sums drift, so every total passes through
 * here before it is displayed or sent to the API.
 *
 * TS: `(value: number) => number`
 */
export const roundMoney = (value) => Math.round(Number(value) * 100) / 100;
