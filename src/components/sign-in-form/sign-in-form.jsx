import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.jsx';
import Button from '../button/button.jsx';

import actions from './actions';

import './sign-in-form.scss';

class SignInForm extends React.Component {
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

    const { signInAction, signInButtonAction } = this.props;

    const formBody = new FormData(this.formRef.current);
    const test = Array.from(formBody);
    const user = Object.fromEntries(test);

    signInAction(user);
  }

  handleFormLeave = (event) => {
    const { signInButtonAction } = this.props;

    const form = event.target.closest('.sign-in-form');
    const button = event.target.closest('.header__sign-in-button');
    if (!form && !button) signInButtonAction(true);
  }

  render() {
    const { authorization } = this.props;

    return (
      <form
        className={`sign-in-form ${authorization.isSignInFormHidden ? 'sign-in-form_hidden' : ''}`}
        onSubmit={this.handleSubmitButton}
        ref={this.formRef}
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
}

const mapStateToProps = function (state) {
  return state;
};

export default connect(mapStateToProps, actions)(SignInForm);
