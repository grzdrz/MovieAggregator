import PropTypes from 'prop-types';

const FiltersType = PropTypes.shape({
  sorters: PropTypes.arrayOf(PropTypes.string),
  byCategory: PropTypes.arrayOf(PropTypes.string),
});

export default FiltersType;
