import { connect } from 'react-redux';
import actions from './actions';
import Header from './header.jsx';

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, actions)(Header);
