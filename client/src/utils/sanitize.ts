/**
 * The API escapes strings on the way in, so values such as `O'Brien` come back
 * as `O&#x27;Brien`. React escapes on output, which would render those entities
 * literally — so decode them once here, for display only.
 *
 * Decoding happens through `textContent`, never `innerHTML`, so no markup in
 * the value can ever execute.
 *
= */
export const decodeEntities = (value: string): string => {
  if (typeof value !== 'string' || !value.includes('&')) {
    return value ?? '';
  }

  const element = document.createElement('textarea');
  element.innerHTML = value;
  return element.value;
};

/** Strips anything that is not a digit, space, +, -, ( or ) from a phone value. */
export const sanitizePhone = (value: string): string => String(value ?? '').replace(/[^\d\s+\-()]/g, '');

/** Collapses runs of whitespace and trims — used before submitting free text. */
export const normalizeWhitespace = (value: string): string => String(value ?? '').replace(/\s+/g, ' ').trim();
