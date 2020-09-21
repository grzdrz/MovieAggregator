/* eslint-disable no-undef */
import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import Pagination from '../pagination.jsx';

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
      render(
        <Router>
          <Switch>
            <Pagination />
          </Switch>
        </Router>,
        container,
      );
    });
    const title = container.querySelector('.pagination__title');
    expect(title).toBeNull();
  });
  it('title', () => {
    act(() => {
      render(
        <Router>
          <Switch>
            <Pagination title='dfsfsd' />
          </Switch>
        </Router>,
        container,
      );
    });
    const title = container.querySelector('.pagination__title');
    expect(title).toBeInstanceOf(HTMLParagraphElement);
    expect(title.textContent).toEqual('dfsfsd');
  });

  it('default pagesCount and pageNumber', () => {
    act(() => {
      render(
        <Router>
          <Switch>
            <Pagination />
          </Switch>
        </Router>,
        container,
      );
    });
    const arrow = container.querySelector('.pagination__left-arrow');
    expect(arrow).toBeNull();
    const links = Array.from(container.querySelectorAll('.pagination__link'));
    expect(links.length).toEqual(1);
  });
  it('pagesCount: 15, pageNumber: 1', () => {
    act(() => {
      render(
        <Router>
          <Switch>
            <Pagination pagesCount={15} pageNumber={1} />
          </Switch>
        </Router>,
        container,
      );
    });
    const leftArrow = container.querySelector('.pagination__left-arrow');
    expect(leftArrow).toBeNull();
    const rightArrow = container.querySelector('.pagination__right-arrow');
    expect(rightArrow).toBeInstanceOf(HTMLAnchorElement);
    const links = Array.from(container.querySelectorAll('.pagination__link'));
    expect(links.length).toEqual(5);
  });
  it('pagesCount: 15, pageNumber: 2', () => {
    act(() => {
      render(
        <Router>
          <Switch>
            <Pagination pagesCount={15} pageNumber={2} />
          </Switch>
        </Router>,
        container,
      );
    });
    const leftArrow = container.querySelector('.pagination__left-arrow');
    expect(leftArrow).toBeInstanceOf(HTMLAnchorElement);
    const rightArrow = container.querySelector('.pagination__right-arrow');
    expect(rightArrow).toBeInstanceOf(HTMLAnchorElement);
    const links = Array.from(container.querySelectorAll('.pagination__link'));
    expect(links.length).toEqual(6);
  });
  it('pagesCount: 15, pageNumber: 5', () => {
    act(() => {
      render(
        <Router>
          <Switch>
            <Pagination pagesCount={15} pageNumber={5} />
          </Switch>
        </Router>,
        container,
      );
    });
    const leftArrow = container.querySelector('.pagination__left-arrow');
    expect(leftArrow).toBeInstanceOf(HTMLAnchorElement);
    const rightArrow = container.querySelector('.pagination__right-arrow');
    expect(rightArrow).toBeInstanceOf(HTMLAnchorElement);
    const links = Array.from(container.querySelectorAll('.pagination__link'));
    expect(links.length).toEqual(9);
  });
  it('pagesCount: 15, pageNumber: 15', () => {
    act(() => {
      render(
        <Router>
          <Switch>
            <Pagination pagesCount={15} pageNumber={15} />
          </Switch>
        </Router>,
        container,
      );
    });
    const leftArrow = container.querySelector('.pagination__left-arrow');
    expect(leftArrow).toBeInstanceOf(HTMLAnchorElement);
    const rightArrow = container.querySelector('.pagination__right-arrow');
    expect(rightArrow).toBeNull();
    const links = Array.from(container.querySelectorAll('.pagination__link'));
    expect(links.length).toEqual(5);
  });

  it('changeCurrentPageAction', () => {
    const mockAction = jest.fn();
    act(() => {
      render(
        <Router>
          <Switch>
            <Pagination changeCurrentPageAction={mockAction} />
          </Switch>
        </Router>,
        container,
      );
    });
    const link = container.querySelector('.pagination__link');
    link.dispatchEvent(new Event('click', { bubbles: true }));
    expect(mockAction).toHaveBeenCalledTimes(1);
    expect(mockAction.mock.calls[0][0]).toEqual(1);
  });

  it('totalItemsCount: > 100', () => {
    act(() => {
      render(
        <Router>
          <Switch>
            <Pagination totalItemsCount={101} />
          </Switch>
        </Router>,
        container,
      );
    });
    const bottomText = container.querySelector('.pagination__bottom-text');
    expect(bottomText.textContent).toEqual('1 - 101 из 100+ продуктов');
  });

  it('pageNumber: 2, pagesCount: 2, totalItemsCount: 9', () => {
    act(() => {
      render(
        <Router>
          <Switch>
            <Pagination pageNumber={2} pagesCount={2} totalItemsCount={9} />
          </Switch>
        </Router>,
        container,
      );
    });
    const bottomText = container.querySelector('.pagination__bottom-text');
    expect(bottomText.textContent).toEqual('6 - 9 из 9 продуктов');
  });
});
