/* eslint-disable no-undef */
import signInAction from '../actions/signInAction';
import signInButtonAction from '../actions/signInButtonAction';
import signUpAction from '../actions/signUpAction';
import signUpButtonAction from '../actions/signUpButtonAction';

describe('authorization actions', () => {
  it('signInAction', () => {
    const user = {
      login: 'login1',
      password: 'qwerty1',
      cookie: 'active',
    };
    const result = signInAction(user);

    expect(result.type).toEqual('SIGN_IN');
    expect(result.user).toEqual(user);
  });

  it('signInButtonAction', () => {
    const result = signInButtonAction(true);

    expect(result.type).toEqual('SIGN_IN_BUTTON');
    expect(result.isSignInFormHidden).toEqual(true);
  });

  it('signUpAction', () => {
    const user = {
      login: 'login1',
      password: 'qwerty1',
    };
    const result = signUpAction(user);

    expect(result.type).toEqual('SIGN_UP');
    expect(result.user).toEqual(user);
  });

  it('signUpButtonAction', () => {
    const result = signUpButtonAction(true);

    expect(result.type).toEqual('SIGN_UP_BUTTON');
    expect(result.isSignUpFormHidden).toEqual(true);
  });
});
