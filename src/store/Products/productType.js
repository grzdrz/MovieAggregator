import PropTypes from 'prop-types';

const ProductType = PropTypes.shape({
  name: PropTypes.string,
  price: PropTypes.number,
  currencyType: PropTypes.string,
  descriptions: PropTypes.string,
  manufacturer: PropTypes.string,
  energyValue: PropTypes.number,
  proteins: PropTypes.number,
  fats: PropTypes.number,
  carbohydrates: PropTypes.number,
  energyUnits: PropTypes.string,
  weightUnits: PropTypes.string,
  shelfLife: PropTypes.number,
  shelfLifeUnits: PropTypes.string,
  packaging: PropTypes.string,
  imageNames: PropTypes.arrayOf(PropTypes.string),
  checkedStars: PropTypes.number,
  reviewsCount: PropTypes.number,
  category: PropTypes.string,
});

export default ProductType;
