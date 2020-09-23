import PropTypes from 'prop-types';

const AuthorizationType = PropTypes.shape({
  isSignUpFormHidden: PropTypes.bool,
  isSignInFormHidden: PropTypes.bool,
  login: PropTypes.string,
  cookie: PropTypes.string,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.string,
      password: PropTypes.string,
      cookie: PropTypes.string,
    }),
  ),
});

export default AuthorizationType;
