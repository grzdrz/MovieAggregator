/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import CreateForm from '../create-form';

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

describe('submit handler', () => {
  it('handleSubmit', () => {
    const mockHandler = jest.fn();
    act(() => {
      render(<CreateForm />, container);
    });

    const form = container.querySelector('.create-form');
    form.addEventListener('submit', mockHandler);
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
