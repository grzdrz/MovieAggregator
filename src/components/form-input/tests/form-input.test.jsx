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

describe('props values', () => {
  it('default title', () => {
    act(() => {
      render(<FormInput />, container);
    });
    const title = container.querySelector('.form-input__title');
    expect(title).toBeNull();
  });
  it('title', () => {
    act(() => {
      render(<FormInput title='blablabla' />, container);
    });
    const title = container.querySelector('.form-input__title');
    expect(title).toBeInstanceOf(HTMLParagraphElement);
    expect(title.textContent).toEqual('blablabla');
  });

  it('default additionalTitle', () => {
    act(() => {
      render(<FormInput title='blablabla' />, container);
    });
    const additionalTitle = container.querySelector('.form-input__additional-title-text');
    expect(additionalTitle).toBeNull();
  });
  it('additionalTitle', () => {
    act(() => {
      render(<FormInput title='blablabla' additionalTitle='blablabla2' />, container);
    });
    const additionalTitle = container.querySelector('.form-input__additional-title-text');
    expect(additionalTitle).toBeInstanceOf(HTMLSpanElement);
    expect(additionalTitle.textContent).toEqual('blablabla2');
  });

  it('default hasSubmitButton', () => {
    act(() => {
      render(<FormInput />, container);
    });
    const submitter = container.querySelector('.form-input__submitter');
    expect(submitter).toBeNull();
  });
  it('hasSubmitButton', () => {
    act(() => {
      render(<FormInput hasSubmitButton />, container);
    });
    const submitter = container.querySelector('.form-input__submitter');
    expect(submitter).toBeInstanceOf(HTMLInputElement);
  });
});
