import changeCurrentPage from '../../store/actions/changeCurrentPage';
import createItem from '../../store/actions/roomsInfoActions/createItem';
import deleteItem from '../../store/actions/roomsInfoActions/deleteItem';
import updateItem from '../../store/actions/roomsInfoActions/updateItem';
import sorter from '../../store/actions/filtersActions/sorter';
import filterByCategory from '../../store/actions/filtersActions/filterByCategory';
import shoppingCartPlusAction from '../../store/actions/shoppingCart/shoppingCartPlusAction';
import shoppingCartMinusAction from '../../store/actions/shoppingCart/shoppingCartMinusAction';

const actions = {
  changeCurrentPage,
  createItem,
  updateItem,
  deleteItem,
  sorter,
  filterByCategory,
  shoppingCartPlusAction,
  shoppingCartMinusAction,
};

export default actions;
