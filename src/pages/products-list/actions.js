import changeCurrentPageAction from '../../store/Pagination/actions/changeCurrentPageAction';
import createItemAction from '../../store/Products/actions/createItemAction';
import deleteItemAction from '../../store/Products/actions/deleteItemAction';
import updateItemAction from '../../store/Products/actions/updateItemAction';
import sorterAction from '../../store/Filters/actions/sorterAction';
import filterByCategoryAction from '../../store/Filters/actions/filterByCategoryAction';
import shoppingCartPlusAction from '../../store/ShoppingCart/actions/shoppingCartPlusAction';
import shoppingCartMinusAction from '../../store/ShoppingCart/actions/shoppingCartMinusAction';

const actions = {
  changeCurrentPageAction,
  createItemAction,
  updateItemAction,
  deleteItemAction,
  sorterAction,
  filterByCategoryAction,
  shoppingCartPlusAction,
  shoppingCartMinusAction,
};

export default actions;
