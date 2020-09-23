import { connect } from 'react-redux';
import actions from './actions';
import SignUpForm from './sign-up-form.jsx';

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, actions)(SignUpForm);
