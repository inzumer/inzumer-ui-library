import { describe, expect, it } from 'vitest';
import { idAttributes } from '../ids';

describe('idAttributes', () => {
  it('returns the id twice: as id and as data-testid', () => {
    expect(idAttributes('cart-button-pay')).toStrictEqual({
      id: 'cart-button-pay',
      'data-testid': 'cart-button-pay',
    });
  });

  it('returns nothing without an id', () => {
    expect(idAttributes()).toStrictEqual({});
    expect(idAttributes('')).toStrictEqual({});
  });
});
