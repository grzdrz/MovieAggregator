import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FormInput from '../form-input/form-input.jsx';
import Button from '../button/button.jsx';

import AuthorizationType from '../../store/Authorization/AuthorizationType';
import defaultAuthorization from '../../store/Authorization/initialState';

import './sign-in-form.scss';

function SignInForm(props) {
  const {
    authorization,
    signInAction,
    signInButtonAction,
  } = props;

  const handleSubmitButton = (event) => {
    event.preventDefault();

    const formBody = new FormData(event.target);
    const test = Array.from(formBody);
    const user = Object.fromEntries(test);

    signInAction(user);
  };

  const handleFormLeave = (event) => {
    /* const { signInButtonAction } = props; */

    const form = event.target.closest('.sign-in-form');
    const button = event.target.closest('.header__sign-in-button');
    if (!form && !button) signInButtonAction(true);
  };

  useEffect(() => {
    document.addEventListener('click', handleFormLeave);
    return (() => {
      document.removeEventListener('click', handleFormLeave);
    });
  }, []);

  return (
    <form
      className={`sign-in-form ${authorization.isSignInFormHidden ? 'sign-in-form_hidden' : ''}`}
      onSubmit={handleSubmitButton}
    >
      <p className='sign-in-form__title'>Авторизация</p>
      <div className='sign-in-form__login-input'>
        <FormInput
          name='login'
          type='text'
          title='логин'
          placeholder='login'
        />
      </div>
      <div className='sign-in-form__password-input'>
        <FormInput
          name='password'
          type='password'
          title='пароль'
          placeholder='password'
        />
      </div>
      <div className='sign-in-form__submit-button'>
        <Button
          hasArrowА
          basisType='submit'
          text='Отправить'
        />
      </div>
    </form>
  );
}

SignInForm.propTypes = {
  authorization: AuthorizationType,
  signInAction: PropTypes.func,
  signInButtonAction: PropTypes.func,
};

SignInForm.defaultProps = {
  authorization: defaultAuthorization,
  signInAction: () => { },
  signInButtonAction: () => { },
};

export default SignInForm;
