/* eslint-disable no-undef */
import shoppingCartMinusAction from '../actions/shoppingCartMinusAction';
import shoppingCartPlusAction from '../actions/shoppingCartPlusAction';

describe('ShoppingCart actions', () => {
  it('shoppingCartMinusAction', () => {
    const result = shoppingCartMinusAction(123);

    expect(result.type).toEqual('PRODUCT_COUNT_MINUS');
    expect(result.productId).toEqual(123);
  });

  it('shoppingCartPlusAction', () => {
    const result = shoppingCartPlusAction(123);

    expect(result.type).toEqual('PRODUCT_COUNT_PLUS');
    expect(result.productId).toEqual(123);
  });
});
