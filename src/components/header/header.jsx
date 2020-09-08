/* eslint-disable object-curly-newline */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ColoredLogo from '../colored-logo/colored-logo.jsx';
import Button from '../button/button.jsx';
import ShoppingCart from '../shopping-cart/shopping-cart.jsx';

import actions from './actions';

import './header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      isAuthorized,
      userFullName,
      products,
      shoppingCart,
      shoppingCartPlusAction,
      shoppingCartMinusAction,
    } = this.props;
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
          isAuthorized
            ? (
              <p className='header__user-full-name'>
                <span className='header__name-text'>{userFullName}</span>
              </p>
            )
            : (
              <div className='header__buttons'>
                <div className='header__sign-in-button'>
                  <Button
                    text='войти'
                    isHollow
                    buttonType='a'
                    hasArrow={false}
                  />
                </div>
                <div className='header__sign-up-button'>
                  <Button
                    text='зарегистрироваться'
                    isHollow={false}
                    buttonType='a'
                    hasArrow={false}
                  />
                </div>
              </div>
            )
        }
        <div className='header__shopping-cart'>
          <ShoppingCart
            products={products.activeProducts}
            shoppingCart={shoppingCart.chosenProducts}
            shoppingCartPlusAction={shoppingCartPlusAction}
            shoppingCartMinusAction={shoppingCartMinusAction}
          />
        </div>
      </header>
    );
  }
}

const mapStateToProps = function (state) {
  return state;
};

export default connect(mapStateToProps, actions)(Header);
