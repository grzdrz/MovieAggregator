import { connect } from 'react-redux';
import actions from './actions';

import SignInForm from './sign-in-form.jsx';

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, actions)(SignInForm);
