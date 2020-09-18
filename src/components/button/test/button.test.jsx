/* eslint-disable no-undef */
import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Button from '../button';

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
  it('default isHollow', () => {
    act(() => {
      render(<Button />, container);
    });
    const buttonContainer = container.querySelector('.button');
    expect(buttonContainer.classList.contains('button_hollow')).toBeFalsy();
  });
  it('isHollow', () => {
    act(() => {
      render(<Button isHollow />, container);
    });
    const buttonContainer = container.querySelector('.button');
    expect(buttonContainer.classList.contains('button_hollow')).toBeTruthy();
  });

  it('default forHeader', () => {
    act(() => {
      render(<Button />, container);
    });
    const text = container.querySelector('.button__text');
    expect(text.classList.contains('button__text_in-header')).toBeFalsy();
  });
  it('forHeader', () => {
    const button = <Button forHeader />;
    act(() => {
      render(button, container);
    });
    const text = container.querySelector('.button__text');
    expect(text.classList.contains('button__text_in-header')).toBeTruthy();
  });

  it('default hasArrow', () => {
    act(() => {
      render(<Button />, container);
    });
    const buttonArrow = container.querySelector('.button__arrow');
    expect(buttonArrow).toBeNull();
  });
  it('hasArrow', () => {
    act(() => {
      render(<Button hasArrow />, container);
    });
    const buttonArrow = container.querySelector('.button__arrow');
    expect(buttonArrow.textContent).toEqual('arrow_forward');
  });

  it('default basisType', () => {
    act(() => {
      render(<Button />, container);
    });
    const basis = container.querySelector('.button__basis');
    expect(basis).toBeInstanceOf(HTMLButtonElement);
  });
  it('basisType: a', () => {
    act(() => {
      render(<Button basisType='a' />, container);
    });
    const basis = container.querySelector('.button__basis');
    expect(basis).toBeInstanceOf(HTMLAnchorElement);
  });
  it('basisType: submit', () => {
    act(() => {
      render(<Button basisType='submit' />, container);
    });
    const basis = container.querySelector('.button__basis');
    expect(basis).toBeInstanceOf(HTMLLabelElement);
  });
  it('basisType: nav', () => {
    act(() => {
      render(
        <Router>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/ProductSupermarket' />} />
            <Button basisType='nav' />
          </Switch>
        </Router>,
        container,
      );
    });
    const basis = container.querySelector('.button__basis');
    expect(basis).toBeInstanceOf(HTMLAnchorElement);
  });
  it('basisType: null', () => {
    act(() => {
      render(<Button basisType='afsdgsfdsd' />, container);
    });
    const basis = container.querySelector('.button__basis');
    expect(basis).toBeNull();
  });

  it('default text', () => {
    act(() => {
      render(<Button />, container);
    });
    const buttonText = container.querySelector('.button__text');
    expect(buttonText.textContent).toEqual('');
  });
  it('text', () => {
    act(() => {
      render(<Button text='someText' />, container);
    });
    const buttonText = container.querySelector('.button__text');
    expect(buttonText.textContent).toEqual('someText');
  });

  it('handleClick', () => {
    const handler = jest.fn();
    act(() => {
      render(<Button handleClick={handler} />, container);
    });
    const basis = container.querySelector('.button__basis');
    act(() => {
      basis.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('default url', () => {
    act(() => {
      render(<Button basisType='a' />, container);
    });
    const basis = container.querySelector('.button__basis');
    expect(basis.href).toEqual('https://errorpage.com/');
  });
  it('url', () => {
    act(() => {
      render(<Button basisType='a' url='http://google.com' />, container);
    });
    const basis = container.querySelector('.button__basis');
    expect(basis.href).toEqual('http://google.com/');
  });
});
