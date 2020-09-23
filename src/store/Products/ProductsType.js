import PropTypes from 'prop-types';
import ProductType from './ProductType';

const ProductsType = PropTypes.shape({
  allProducts: PropTypes.arrayOf(PropTypes.shape(ProductType)),
  activeProducts: PropTypes.arrayOf(PropTypes.shape(ProductType)),
});

export default ProductsType;
