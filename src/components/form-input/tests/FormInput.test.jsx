/* eslint-disable no-undef */
import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import FormInput from '../form-input';

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

it('renders with or without a name', () => {
  act(() => {
    render(<FormInput />, container);
  });
  const input = container.querySelector('.form-input__input');
  expect(input.value).toBe('');
});
