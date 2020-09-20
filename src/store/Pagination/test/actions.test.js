/* eslint-disable no-undef */
import changeCurrentPageAction from '../actions/changeCurrentPageAction';

describe('Pagination actions', () => {
  it('changeCurrentPageAction', () => {
    const result = changeCurrentPageAction(123);

    expect(result.type).toEqual('CHANGE_CURRENT_PAGE');
    expect(result.pageNumber).toEqual(123);
  });
});
