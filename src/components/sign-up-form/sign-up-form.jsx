import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FormInput from '../form-input/form-input.jsx';
import Button from '../button/button.jsx';

import AuthorizationType from '../../store/Authorization/AuthorizationType';
import defaultAuthorization from '../../store/Authorization/initialState';

import './sign-up-form.scss';

function SignUpForm(props) {
  const {
    authorization,
    signUpAction,
    signUpButtonAction,
  } = props;

  const handleSubmitButton = (event) => {
    event.preventDefault();

    const formBody = new FormData(event.target);
    const test = Array.from(formBody);
    const user = Object.fromEntries(test);

    signUpAction(user);
  };

  const handleFormLeave = (event) => {
    const form = event.target.closest('.sign-up-form');
    const button = event.target.closest('.header__sign-up-button');
    if (!form && !button) signUpButtonAction(true);
  };

  useEffect(() => {
    document.addEventListener('click', handleFormLeave);
    return (() => {
      document.removeEventListener('click', handleFormLeave);
    });
  }, []);

  return (
    <form
      className={`sign-up-form ${authorization.isSignUpFormHidden ? 'sign-up-form_hidden' : ''}`}
      onSubmit={handleSubmitButton}
    >
      <p className='sign-up-form__title'>Регистрация</p>
      <div className='sign-up-form__login-input'>
        <FormInput
          name='login'
          type='text'
          title='логин'
          placeholder='login'
        />
      </div>
      <div className='sign-up-form__password-input'>
        <FormInput
          name='password'
          type='password'
          title='пароль'
          placeholder='password'
        />
      </div>
      <div className='sign-up-form__submit-button'>
        <Button
          hasArrow
          basisType='submit'
          text='Отправить'
        />
      </div>
    </form>
  );
}

SignUpForm.propTypes = {
  authorization: AuthorizationType,
  signUpAction: PropTypes.func,
  signUpButtonAction: PropTypes.func,
};

SignUpForm.defaultProps = {
  authorization: defaultAuthorization,
  signUpAction: () => { },
  signUpButtonAction: () => { },
};

export default SignUpForm;
