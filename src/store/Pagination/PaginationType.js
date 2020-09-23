import PropTypes from 'prop-types';
import ProductType from '../Products/ProductType';

const PaginationType = PropTypes.shape({
  itemsCountOnPage: PropTypes.number,
  pageNumber: PropTypes.number,
  pagesCount: PropTypes.number,
  productsOfPage: PropTypes.arrayOf(ProductType),
});

export default PaginationType;
