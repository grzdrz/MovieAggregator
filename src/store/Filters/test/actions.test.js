/* eslint-disable no-undef */
import filterByCategoryAction from '../actions/filterByCategoryAction';
import sorterAction from '../actions/sorterAction';

describe('Filter actions', () => {
  it('filterByCategoryAction', () => {
    const filter = [
      'meat',
      'fish',
      'milk',
      'fruit',
      'berry',
    ];
    const result = filterByCategoryAction(filter);

    expect(result.type).toEqual('BY_CATEGORY');
    expect(result.filter).toEqual(filter);
  });

  it('sorterAction', () => {
    const sorters = [
      'price',
    ];
    const result = sorterAction(sorters);

    expect(result.type).toEqual('SORTERS');
    expect(result.sorters).toEqual(sorters);
  });
});
