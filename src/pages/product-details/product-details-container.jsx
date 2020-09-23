import { connect } from 'react-redux';
import ProductDetails from './product-details.jsx';

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ProductDetails);
