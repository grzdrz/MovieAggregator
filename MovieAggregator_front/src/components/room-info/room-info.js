import React from "react";
import "./room-info.scss";

class RoomInfo extends React.Component {
    constructor(props) {
        super(props);
        let options = {};
        Object.assign(options, props);
        this.state = options;

        this.container = React.createRef();
    }

    /* initialize() {
        this.containerElement = this.outerContainerElement.querySelector(".room-info");
        this.arrows = this.containerElement.querySelector(".room-info__arrows");
        if (this.arrows) {
            this.leftArrow = this.arrows.querySelector(".room-info__arrow-back");
            this.rightArrow = this.arrows.querySelector(".room-info__arrow-forward");
        }
        this.radioButtons = Array.from(this.containerElement.querySelectorAll(".room-info__radio-button"));

        if (this.leftArrow && this.rightArrow) {
            this.leftArrow.onclick = this.handlerLeftArrowClick;
            this.rightArrow.onclick = this.handlerRightArrowClick;
        }
    } */

    formateNumber(number) {
        return `${number}`.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }

    handlerLeftArrowClick = (event) => {
        if (event.currentTarget.disabled) return;

        const radioButtons = Array.from(this.container.current.querySelectorAll(".room-info__radio-button"));
        const checkedButton = radioButtons.find((button) => button.checked);

        if (!checkedButton.previousElementSibling) return;

        if (checkedButton.dataset.serialNumber === "2") {
            checkedButton.checked = false;
            checkedButton.previousElementSibling.previousElementSibling.checked = true;
        } else if (checkedButton.dataset.serialNumber === "4") {
            checkedButton.checked = false;
            checkedButton.previousElementSibling.previousElementSibling.checked = true;
        } else {
            checkedButton.checked = false;
            checkedButton.previousElementSibling.previousElementSibling.checked = true;
        }
    }

    handlerRightArrowClick = (event) => {
        if (event.currentTarget.disabled) return;

        const radioButtons = Array.from(this.container.current.querySelectorAll(".room-info__radio-button"));
        const checkedButton = radioButtons.find((button) => button.checked);

        if (!checkedButton.nextElementSibling.nextElementSibling.matches(".room-info__radio-button")) return;
        if (checkedButton.nextElementSibling.nextElementSibling.disabled) return;

        if (checkedButton.dataset.serialNumber === "3") {
            checkedButton.checked = false;
            checkedButton.nextElementSibling.nextElementSibling.checked = true;
        } else if (checkedButton.dataset.serialNumber === "1") {
            checkedButton.checked = false;
            checkedButton.nextElementSibling.nextElementSibling.checked = true;
        } else {
            checkedButton.checked = false;
            checkedButton.nextElementSibling.nextElementSibling.checked = true;
        }
    }

    render() {
        const {
            url,
            blockNumber,
            photos,
            numberOfCheckedStar,
            reviewsCount,
            roomNumber,
            roomStatus,
            roomPrice,
            currencyType,
        } = this.state;
        const radio = [1, 0, 0, 0];

        return (
            <div className="room-info" ref={this.container}>
                <a className="room-info__ref" href={url}></a>
                <div className="room-info__photos">
                    {radio.map((value, index) => {
                        let i = index + 1;
                        return (
                            <React.Fragment key={`room-info__radio-button_${i}`}>
                                <input className={`room-info__radio-button room-info__radio-button_${i}`}
                                    type="radio"
                                    name={`photo_${blockNumber}`}
                                    checked={value === 1}
                                    disabled={i > photos.length}
                                    data-serial-number={i}>
                                </input>
                                <div className="room-info__radio-button-image"></div>
                            </React.Fragment>
                        );
                    })}
                    {photos.map((photo, i) => {
                        return (
                            <img className={`room-info__photo room-info__photo_${i + 1}`} key={`room-info__photo room-info__photo_${i + 1}`}
                                src={`./src/components/room-info/img/${photo}.png`}
                                alt="room photo"></img>
                        );
                    })}
                    {photos.length > 1 ?
                        <div className="room-info__arrows">
                            <button className="room-info__arrow-back" onClick={this.handlerLeftArrowClick}>
                                <span className="room-info__arrow-back-icon">expand_more</span>
                            </button>
                            <button className="room-info__arrow-forward" onClick={this.handlerRightArrowClick}>
                                <span className="room-info__arrow-forward-icon">expand_more</span>
                            </button>
                        </div>
                        : null
                    }
                </div>
                <div className="room-info__text-info">
                    <p className="room-info__title">
                        <span className="room-info__number-symbol">№</span>
                        <span className="room-info__room-number">{roomNumber}</span>
                        <span className="room-info__room-status">{roomStatus ? roomStatus : ""}</span>
                        <span className="room-info__room-price">{`${this.formateNumber(roomPrice)}${currencyType}`}</span>
                        <span className="room-info__period-of-time">{`в сутки`}</span>
                    </p>
                    <div className="room-info__room-rate">
                        {/* +star-rating({
                            blockNumber: blockNumber,
                            numberOfCheckedStar: numberOfCheckedStar,
                        }) */}
                        <p className="room-info__reviews-count">
                            <span className="room-info__reviews-count-value">{reviewsCount}</span>
                            <span className="room-info__reviews-count-text">Отзывов</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomInfo;
