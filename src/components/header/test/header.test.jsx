/* eslint-disable no-undef */
import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import Header from '../header.jsx';
import defaultAuthorization from '../../../store/Authorization/initialState';

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = undefined;
});

describe('props values', () => {
  it('default authorization', () => {
    act(() => {
      render(
        <Router>
          <Switch>
            <Header />
          </Switch>
        </Router>,
        container,
      );
    });
    const title = container.querySelector('.form-input__title');
    expect(title).toBeNull();
  });
  it('authorization', () => {
    const authorization = { ...defaultAuthorization };
    authorization.cookie = 'active';
    act(() => {
      render(
        <Router>
          <Switch>
            <Header authorization={authorization} />
          </Switch>
        </Router>,
        container,
      );
    });
    const userFullName = container.querySelector('.header__user-full-name');
    expect(userFullName).toBeInstanceOf(HTMLParagraphElement);
    const userFullNameText = container.querySelector('.header__name-text');
    expect(userFullNameText.textContent).toEqual(authorization.login);
  });
});
