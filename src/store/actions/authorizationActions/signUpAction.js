function signUpAction(user) {
  return {
    type: 'SIGN_UP',
    user,
  };
}

export default signUpAction;
