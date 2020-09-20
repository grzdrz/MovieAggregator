/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import DeleteButton from '../delete-button';

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

describe('handler with props', () => {
  it('handleButtonClick, productId and default deleteItemAction', () => {
    const mockHandler = jest.fn();
    act(() => {
      render(<DeleteButton productId={0} />, container);
    });

    const button = container.querySelector('.delete-button__button-container');
    button.addEventListener('click', mockHandler);
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('handleButtonClick and default productId', () => {
    const mockHandler = jest.fn();
    const mockAction = jest.fn();
    act(() => {
      render(<DeleteButton deleteItemAction={mockAction} />, container);
    });

    const button = container.querySelector('.delete-button__button-container');
    button.addEventListener('click', mockHandler);
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockAction).toHaveBeenCalledTimes(0);
  });

  it('handleButtonClick and productId', () => {
    const mockHandler = jest.fn();
    const mockAction = jest.fn();
    act(() => {
      render(<DeleteButton productId={0} deleteItemAction={mockAction} />, container);
    });

    const button = container.querySelector('.delete-button__button-container');
    button.addEventListener('click', mockHandler);
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockAction).toHaveBeenCalledTimes(1);
    expect(mockAction.mock.calls[0][0]).toEqual(0);
  });
});
