/* eslint-disable no-undef */
import actions from '../actions';
import shoppingCartPlusAction from '../../../store/ShoppingCart/actions/shoppingCartPlusAction';
import shoppingCartMinusAction from '../../../store/ShoppingCart/actions/shoppingCartMinusAction';
import signUpButtonAction from '../../../store/Authorization/actions/signUpButtonAction';
import signInButtonAction from '../../../store/Authorization/actions/signInButtonAction';

it('header actions', () => {
  expect(actions.shoppingCartPlusAction).toEqual(shoppingCartPlusAction);
  expect(actions.shoppingCartMinusAction).toEqual(shoppingCartMinusAction);
  expect(actions.signUpButtonAction).toEqual(signUpButtonAction);
  expect(actions.signInButtonAction).toEqual(signInButtonAction);
});
