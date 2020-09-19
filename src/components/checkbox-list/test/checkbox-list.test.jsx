/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import CheckboxList from '../checkbox-list';

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
  it('inputClick', () => {
    const handler = jest.fn();
    act(() => {
      render(<CheckboxList inputClick={handler} />, container);
    });
    const input = container.querySelector('.checkbox-list__input');
    act(() => {
      input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('default title', () => {
    act(() => {
      render(<CheckboxList />, container);
    });
    const title = container.querySelector('.checkbox-list__title');
    expect(title).toBeNull();
  });
  it('title', () => {
    act(() => {
      render(<CheckboxList title='dsfsdf' />, container);
    });
    const title = container.querySelector('.checkbox-list__title');
    expect(title).toBeInstanceOf(HTMLParagraphElement);
  });

  it('default isExpandable', () => {
    act(() => {
      render(<CheckboxList />, container);
    });
    const checkboxListContainer = container.querySelector('.checkbox-list');
    expect(checkboxListContainer.classList.contains('checkbox-list_type_expandable')).toBeTruthy();
  });
  it('isExpandable', () => {
    act(() => {
      render(<CheckboxList title='sdfsdfs' isExpandable={false} />, container);
    });
    const checkboxListContainer = container.querySelector('.checkbox-list');
    expect(checkboxListContainer.classList.contains('checkbox-list_type_expandable')).toBeFalsy();
    const arrow = container.querySelector('.checkbox-list__dropdown-arrow');
    expect(arrow).toBeNull();
  });

  it('default hasAdditionalText', () => {
    act(() => {
      render(<CheckboxList />, container);
    });
    const checkboxListContainer = container.querySelector('.checkbox-list');
    expect(checkboxListContainer.classList.contains('checkbox-list_type_rich')).toBeFalsy();
  });
  it('hasAdditionalText', () => {
    act(() => {
      render(<CheckboxList isExpandable={false} hasAdditionalText />, container);
    });
    const checkboxListContainer = container.querySelector('.checkbox-list');
    expect(checkboxListContainer.classList.contains('checkbox-list_type_rich')).toBeTruthy();
  });

  it('default list', () => {
    act(() => {
      render(<CheckboxList />, container);
    });
    const items = Array.from(container.querySelectorAll('.checkbox-list__item'));
    expect(items.length).toEqual(1);
  });
  it('list', () => {
    const list = [
      { isChecked: true, text: 'Мясо', name: 'meat', type: 'by-category' },
      { isChecked: true, text: 'Рыба', name: 'fish', type: 'by-category' },
      { isChecked: true, text: 'Кисломолочное изделие', name: 'milk', type: 'by-category' },
      { isChecked: true, text: 'Фрукт', name: 'fruit', type: 'by-category' },
      { isChecked: true, text: 'Ягода', name: 'berry', type: 'by-category' },
    ];
    act(() => {
      render(<CheckboxList list={list} />, container);
    });
    const items = Array.from(container.querySelectorAll('.checkbox-list__item'));
    expect(items.length).toEqual(5);
  });

  it('default isClosed', () => {
    act(() => {
      render(<CheckboxList title='asdasd' />, container);
    });
    const closedArrow = container.querySelector('.checkbox-list__dropdown-arrow_closed');
    const closedList = container.querySelector('.checkbox-list__list_closed');
    expect(closedArrow).toBeNull();
    expect(closedList).toBeNull();
  });
  it('isClosed', () => {
    act(() => {
      render(<CheckboxList title='asdasd' isClosed />, container);
    });
    const closedArrow = container.querySelector('.checkbox-list__dropdown-arrow_closed');
    const closedList = container.querySelector('.checkbox-list__list_closed');
    expect(closedArrow).toBeInstanceOf(HTMLSpanElement);
    expect(closedList).toBeInstanceOf(HTMLUListElement);
  });
});

describe('handleCheckboxExpand', () => {
  it('invoke setIsClosed handler', () => { // вызов обработчика с переключением стейта закрытия выпадающего списка
    act(() => {
      render(<CheckboxList title='adfsdfs' />, container);
    });
    const title = container.querySelector('.checkbox-list__title');
    let closedArrow = container.querySelector('.checkbox-list__dropdown-arrow_closed');
    let closedList = container.querySelector('.checkbox-list__list_closed');
    expect(closedArrow).toBeNull();
    expect(closedList).toBeNull();

    act(() => {
      title.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    closedArrow = container.querySelector('.checkbox-list__dropdown-arrow_closed');
    closedList = container.querySelector('.checkbox-list__list_closed');
    expect(closedArrow).toBeInstanceOf(HTMLSpanElement);
    expect(closedList).toBeInstanceOf(HTMLUListElement);

    act(() => {
      title.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    closedArrow = container.querySelector('.checkbox-list__dropdown-arrow_closed');
    closedList = container.querySelector('.checkbox-list__list_closed');
    expect(closedArrow).toBeNull();
    expect(closedList).toBeNull();
  });
});
