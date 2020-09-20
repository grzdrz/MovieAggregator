/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import CreateButton from '../create-button';

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

describe('props values', () => {
  it('default isOpened', () => {
    act(() => {
      render(<CreateButton />, container);
    });
    const openedButton = container.querySelector('.create-button__form_opened');
    expect(openedButton).toBeNull();
  });
  it('isOpened', () => {
    act(() => {
      render(<CreateButton isOpened />, container);
    });
    const openedButton = container.querySelector('.create-button__form_opened');
    expect(openedButton).toBeInstanceOf(HTMLDivElement);
  });
});

describe('click handlers', () => {
  it('handleDropdownLeave', () => {
    act(() => {
      render(<CreateButton />, container);
    });
    let openedButton = container.querySelector('.create-button__form_opened');
    expect(openedButton).toBeNull();

    // нажимаем на кнопку и открываем форму
    const button = container.querySelector('.create-button__button-container');
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // нажимаем на элемент заглушку, инвокая клик ивент в document и закрываем форму
    const mockElement = document.createElement('div');
    document.body.append(mockElement);
    mockElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    openedButton = container.querySelector('.create-button__form_opened');
    expect(openedButton).toBeNull();
  });
});
