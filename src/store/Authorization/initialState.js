const initialState = {
  isSignUpFormHidden: true,
  isSignInFormHidden: true,
  login: '',
  cookie: '',
  users: [ // т.к. бэка нет, то этот редюсер дополнительно его имитирует
    {
      login: 'login1',
      password: 'qwerty1',
      cookie: 'active',
    },
    {
      login: 'login2',
      password: 'qwerty2',
      cookie: '',
    },
  ],
};

export default initialState;
