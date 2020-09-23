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
  it('productId: >= 0', () => {
    const mockAction1 = jest.fn();
    const mockAction2 = jest.fn();
    act(() => {
      render(<ProductCounter shoppingCartPlusAction={mockAction1} shoppingCartMinusAction={mockAction2} productId={0} />, container);
    });

    const minusButton = container.querySelector('.product-counter__minus-button');
    const plusButton = container.querySelector('.product-counter__plus-button');
    minusButton.dispatchEvent(new Event('click', { bubbles: true }));
    plusButton.dispatchEvent(new Event('click', { bubbles: true }));
    expect(mockAction1).toHaveBeenCalled();
    expect(mockAction1.mock.calls[0][0]).toEqual(0);
    expect(mockAction2.mock.calls[0][0]).toEqual(0);
  });

  it('chosenProducts with productId: 1, productCount: > 0', () => {
    const chosenProducts = [{
      productId: 1,
      productCount: 1,
    }];
    act(() => {
      render(<ProductCounter chosenProducts={chosenProducts} productId={1} />, container);
    });

    const activeMinusButton = container.querySelector('.product-counter__minus-button_active');
    expect(activeMinusButton).not.toBeNull();
  });
});
