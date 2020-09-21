import PropTypes from 'prop-types';

const ChosenProductsType = PropTypes.arrayOf(
  PropTypes.shape({
    productId: PropTypes.number,
    productCount: PropTypes.number,
  }),
);

export default ChosenProductsType;
