function signInAction(user) {
  return {
    type: 'SIGN_IN',
    user,
  };
}

export default signInAction;
