import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.jsx';
import Button from '../button/button.jsx';

import actions from './actions';

import './sign-up-form.scss';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.handleFormLeave);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleFormLeave);
  }

  handleSubmitButton = (event) => {
    event.preventDefault();

    const { signUpAction, signUpButtonAction } = this.props;

    const formBody = new FormData(this.formRef.current);
    const test = Array.from(formBody);
    const user = Object.fromEntries(test);

    signUpAction(user);
  }

  handleFormLeave = (event) => {
    const { signUpButtonAction } = this.props;

    const form = event.target.closest('.sign-up-form');
    const button = event.target.closest('.header__sign-up-button');
    if (!form && !button) signUpButtonAction(true);
  }

  render() {
    const { authorization } = this.props;

    return (
      <form
        className={`sign-up-form ${authorization.isSignUpFormHidden ? 'sign-up-form_hidden' : ''}`}
        onSubmit={this.handleSubmitButton}
        ref={this.formRef}
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
}

const mapStateToProps = function (state) {
  return state;
};

export default connect(mapStateToProps, actions)(SignUpForm);
