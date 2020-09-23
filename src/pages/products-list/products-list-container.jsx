import { connect } from 'react-redux';
import ProductsList from './products-list.jsx';
import actions from './actions';

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, actions)(ProductsList);
