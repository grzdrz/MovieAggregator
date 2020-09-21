/* eslint-disable no-undef */
import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ProductCounter from '../product-counter.jsx';

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
  it('default productId', () => {
    const mockAction1 = jest.fn();
    const mockAction2 = jest.fn();
    act(() => {
      render(<ProductCounter shoppingCartPlusAction={mockAction1} shoppingCartMinusAction={mockAction2} />, container);
    });

    const minusButton = container.querySelector('.product-counter__minus-button');
    const plusButton = container.querySelector('.product-counter__plus-button');
    minusButton.dispatchEvent(new Event('click', { bubbles: true }));
    plusButton.dispatchEvent(new Event('click', { bubbles: true }));
    expect(mockAction1).not.toHaveBeenCalled();
    expect(mockAction2).not.toHaveBeenCalled();
  });
  /* it('title', () => {
    act(() => {
      render(<ProductCounter />, container);
    });
    const title = container.querySelector('.pagination__title');
    expect(title).toBeInstanceOf(HTMLParagraphElement);
    expect(title.textContent).toEqual('dfsfsd');
  }); */
});
