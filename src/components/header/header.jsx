import React from "react";

import ColoredLogo from "../colored-logo/colored-logo.jsx";
import Button from "../button/button.jsx";

function HeaderComponent(props) {

    const { isAuthorized, userFullName } = props;
    const navList = [
        { url: 'https://www.google.com/', text: 'О нас', hasDropdown: false },
        { url: 'https://www.google.com/', text: 'Услуги', hasDropdown: true },
        { url: 'https://www.google.com/', text: 'Вакансии', hasDropdown: false },
        { url: 'https://www.google.com/', text: 'Новости', hasDropdown: false },
        { url: 'https://www.google.com/', text: 'Соглашения', hasDropdown: true },
    ];

    return (
        <header className="header">
            <div className="header__colored-logo">
                <ColoredLogo />
            </div>

            <nav className="header__navigation-menu">
                <ul className="header__list">
                    {
                        navList.map((element, index) =>
                            <li className="header__item" key={`header__item-${index}`}>
                                <a className="header__item-ref"
                                    href={element.url} target="_blank" rel="noopener noreferrer"> {element.text}
                                </a>
                                {element.hasDropdown ? <span className="header__dropdown-arrow">expand_more</span> : null}
                            </li>
                        )
                    }
                </ul>
            </nav>
            {
                isAuthorized ?
                    <p className="header__user-full-name">
                        <span className="header__name-text">{userFullName}</span>
                    </p>
                    :
                    <div className="header__buttons">
                        <div className="header__sign-in-button">
                            <Button
                                text="войти"
                                isHollow={true}
                                buttonType="a"
                                hasArrow={false}
                            />
                        </div>
                        <div className="header__sign-up-button">
                            <Button
                                text="зарегистрироваться"
                                isHollow={false}
                                buttonType="a"
                                hasArrow={false}
                            />
                        </div>
                    </div>
            }
        </header >
    );
}

export default HeaderComponent;
