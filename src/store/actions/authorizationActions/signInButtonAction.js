function signInButtonAction(isSignInFormHidden) {
  return {
    type: 'SIGN_IN_BUTTON',
    isSignInFormHidden,
  };
}

export default signInButtonAction;
