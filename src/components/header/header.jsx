/* eslint-disable object-curly-newline */
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import ColoredLogo from '../colored-logo/colored-logo.jsx';
import Button from '../button/button.jsx';
import ShoppingCart from '../shopping-cart/shopping-cart.jsx';

import defaultAuthorization from '../../store/Authorization/initialState';
import defaultShoppingCart from '../../store/ShoppingCart/initialState';
import defaultProducts from '../../store/Products/initialState';
import productType from '../../store/Products/productType';

import './header.scss';

function Header(props) {
  const {
    products,
    shoppingCart,
    authorization,
    shoppingCartPlusAction,
    shoppingCartMinusAction,
    signUpButtonAction,
    signInButtonAction,
  } = props;
  const navList = [
    { url: '/ProductSupermarket/productList/1', text: 'Список продуктов', hasDropdown: false, isNavLink: true },
    { url: 'https://www.google.com/', text: 'О нас', hasDropdown: false },
    { url: 'https://www.google.com/', text: 'Услуги', hasDropdown: true },
    { url: 'https://www.google.com/', text: 'Вакансии', hasDropdown: false },
    { url: 'https://www.google.com/', text: 'Новости', hasDropdown: false },
    { url: 'https://www.google.com/', text: 'Соглашения', hasDropdown: true },
  ];

  return (
    <header className='header'>
      <div className='header__colored-logo'>
        <ColoredLogo />
      </div>

      <nav className='header__navigation-menu'>
        <ul className='header__list'>
          {
            navList.map((element) => (
              <li className='header__item' key={`header__item-${element.text}`}>
                {element.isNavLink
                  ? <NavLink className='header__item-ref' to={element.url}>{element.text}</NavLink>
                  : (
                    <a
                      className='header__item-ref'
                      href={element.url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {element.text}
                    </a>
                  )}
                {element.hasDropdown ? <span className='header__dropdown-arrow'>expand_more</span> : null}
              </li>
            ))
          }
        </ul>
      </nav>
      {
        authorization.cookie
          ? (
            <p className='header__user-full-name'>
              <span className='header__name-text'>{authorization.login}</span>
            </p>
          )
          : (
            <div className='header__buttons'>
              <div className='header__sign-in-button'>
                <Button
                  text='войти'
                  isHollow
                  forHeader
                  basisType='a'
                  hasArrow={false}
                  handleClick={signInButtonAction}
                />
              </div>
              <div className='header__sign-up-button'>
                <Button
                  text='зарегистрироваться'
                  isHollow={false}
                  forHeader
                  basisType='a'
                  hasArrow={false}
                  handleClick={signUpButtonAction}
                />
              </div>
            </div>
          )
      }
      <div className='header__shopping-cart'>
        <ShoppingCart
          products={products.allProducts}
          chosenProducts={shoppingCart.chosenProducts}
          shoppingCartPlusAction={shoppingCartPlusAction}
          shoppingCartMinusAction={shoppingCartMinusAction}
        />
      </div>
    </header>
  );
}

Header.propTypes = {
  products: PropTypes.shape({
    allProducts: PropTypes.arrayOf(PropTypes.shape(productType)),
    activeProducts: PropTypes.arrayOf(PropTypes.shape(productType)),
  }),
  shoppingCart: PropTypes.shape({
    chosenProducts: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.number,
        productCount: PropTypes.number,
      }),
    ),
  }),
  authorization: PropTypes.shape({
    isSignUpFormHidden: PropTypes.bool,
    isSignInFormHidden: PropTypes.bool,
    login: PropTypes.string,
    cookie: PropTypes.string,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        login: PropTypes.string,
        password: PropTypes.string,
        cookie: PropTypes.string,
      }),
    ),
  }),
  shoppingCartPlusAction: PropTypes.func,
  shoppingCartMinusAction: PropTypes.func,
  signUpButtonAction: PropTypes.func,
  signInButtonAction: PropTypes.func,
};

Header.defaultProps = {
  products: defaultProducts,
  shoppingCart: defaultShoppingCart,
  authorization: defaultAuthorization,
  shoppingCartPlusAction: () => { },
  shoppingCartMinusAction: () => { },
  signUpButtonAction: () => { },
  signInButtonAction: () => { },
};

export default Header;
