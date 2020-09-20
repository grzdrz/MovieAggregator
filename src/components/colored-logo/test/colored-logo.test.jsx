/* eslint-disable no-undef */
import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ColoredLogo from '../colored-logo';

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.append(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = undefined;
});

it('render', () => {
  act(() => {
    render(<ColoredLogo />, container);
  });
  const logo = container.querySelector('.colored-logo');
  expect(logo).toBeInstanceOf(HTMLDivElement);
});
