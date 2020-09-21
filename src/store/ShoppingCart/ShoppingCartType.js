import PropTypes from 'prop-types';
import ChosenProductsType from './ChosenProductsType';

const ShoppingCartType = PropTypes.shape({
  chosenProducts: ChosenProductsType,
});

export default ShoppingCartType;
