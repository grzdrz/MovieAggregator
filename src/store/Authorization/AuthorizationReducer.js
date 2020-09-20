import Reducer from '../reducer';
import initialState from './initialState';

class AuthorizationReducer extends Reducer {
  constructor(reducerManager, state = { ...initialState }) {
    super(reducerManager, state);
  }

  reduce = (state = this.state, action) => {
    this.state = { ...state };
    switch (action.type) {
      case 'SIGN_UP_BUTTON': {
        this.state.isSignUpFormHidden = action.isSignUpFormHidden || !this.state.isSignUpFormHidden;
        break;
      }
      case 'SIGN_IN_BUTTON': {
        this.state.isSignInFormHidden = action.isSignInFormHidden || !this.state.isSignInFormHidden;
        break;
      }
      case 'SIGN_UP': {
        this.state.isSignUpFormHidden = true;
        const userCollision = this.state.users.find((user) => user.login === action.user.login);
        if (!userCollision) {
          this.state.users.push({
            ...action.user,
            cookie: '',
          });
        }
        break;
      }
      case 'SIGN_IN': {
        this.state.isSignInFormHidden = true;
        const userCollision = this.state.users.find((user) => user.login === action.user.login && user.password === action.user.password);
        if (userCollision) {
          userCollision.cookie = 'active';
          this.state.login = userCollision.login;
          this.state.cookie = userCollision.cookie;
        }
        break;
      }
      default: {
        break;
      }
    }

    return this.state;
  }
}

export default AuthorizationReducer;
