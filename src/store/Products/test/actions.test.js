/* eslint-disable no-undef */
import createItemAction from '../actions/createItemAction';
import deleteItemAction from '../actions/deleteItemAction';
import updateItemAction from '../actions/updateItemAction';
import baseProduct from '../baseProduct';

describe('Products actions', () => {
  it('createItemAction', () => {
    const product = { ...baseProduct };
    const result = createItemAction(product);

    expect(result.type).toEqual('CREATE');
    expect(result.product).toEqual(product);
  });

  it('deleteItemAction', () => {
    const result = deleteItemAction(123);

    expect(result.type).toEqual('DELETE');
    expect(result.productId).toEqual(123);
  });

  it('updateItemAction', () => {
    const product = { ...baseProduct };
    const result = updateItemAction(product);

    expect(result.type).toEqual('UPDATE');
    expect(result.product).toEqual(product);
  });
});
