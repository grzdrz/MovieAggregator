import React from "react";
import CrudFormsLinks from "../crud-forms-links/crud-forms-links";

import "./room-info.scss";

class RoomInfo extends React.Component {
  constructor(props) {
    super(props);
    this.currentPhotoIndex = props.currentPhotoIndex !== undefined ? props.currentPhotoIndex : 0;

    this.container = React.createRef();
    /* this._initialize(); */
  }

  componentDidMount() {
    const containerElement = this.container.current;
    this.arrows = containerElement.querySelector('.js-room-info__arrows');
    if (this.arrows) {
      this.leftArrow = this.arrows.querySelector('.js-room-info__arrow-back');
      this.rightArrow = this.arrows.querySelector('.js-room-info__arrow-forward');
    }

    this.radioButtons = Array.from(containerElement.querySelectorAll('.js-room-info__radio-button'));
    this.photos = Array.from(containerElement.querySelectorAll('.js-room-info__photo'));

    if (this.leftArrow && this.rightArrow) {
      this.leftArrow.addEventListener('click', this._handleLeftArrowClick);
      this.rightArrow.addEventListener('click', this._handleRightArrowClick);
    }

    this._update();
  }

  _move(isDirectionForward) {
    if (isDirectionForward) {
      if (this.currentPhotoIndex === this.radioButtons.length - 1) return;
      this.currentPhotoIndex += 1;
    } else {
      if (this.currentPhotoIndex === 0) return;
      this.currentPhotoIndex -= 1;
    }
  }

  _update() {
    this.radioButtons.forEach((button, index) => {
      if (index === this.currentPhotoIndex) button.classList.toggle('room-info__radio-button_checked', true);
      else button.classList.toggle('room-info__radio-button_checked', false);
    });
    this.photos.forEach((photo, index) => {
      if (index === this.currentPhotoIndex) photo.classList.toggle('room-info__photo_current', true);
      else photo.classList.toggle('room-info__photo_current', false);
    });
  }

  _handleLeftArrowClick = () => {
    this._move(false);
    this._update();
  }

  _handleRightArrowClick = () => {
    this._move(true);
    this._update();
  }

  _formateNumber(number) {
    return `${number}`.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  }

  render() {
    const {
      url,
      blockNumber,
      photosCount = 4,
      checkedStarIndex,
      reviewsCount,
      roomNumber,
      roomStatus,
      roomPrice,
      currencyType,
    } = this.props;
    const iterationCount = (photosCount <= 4 ? 4 : photosCount);
    const iterator = [];
    for (let i = 0; i < iterationCount; i += 1) iterator.push(0);

    return (
      <div className="room-info js-room-info" ref={this.container}>
        <a className="room-info__ref" href={url}></a>
        <div className="room-info__photos">
          <div className="room-info__radio-buttons">
            {iterator.map((value, index) => {
              let i = index + 1;
              return (
                <p className={`room-info__radio-button js-room-info__radio-button`} data-serial-number={i} key={`room-info__radio-button-${i}`}>
                  <span className="room-info__radio-button-image js-room-info__radio-button-image"></span>
                </p>
              );
            })}
          </div>
          {iterator.map((photo, i) => {
            return (
              <img className={`room-info__photo js-room-info__photo`} key={`room-info__photo room-info__photo-${i}`}
                src={`/src/components/room-info/img/room-${roomNumber}${photosCount > 1 ? `-${i + 1}` : ""}.png`}
                alt="room photo"
                data-serial-number={i}></img>
            );
          })}
          {photosCount > 1 ?
            <div className="room-info__arrows js-room-info__arrows">
              <button className="room-info__arrow-back js-room-info__arrow-back" onClick={this.handlerLeftArrowClick}>
                <span className="room-info__arrow-back-icon">expand_more</span>
              </button>
              <button className="room-info__arrow-forward js-room-info__arrow-forward" onClick={this.handlerRightArrowClick}>
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
            <span className="room-info__room-price">{`${this._formateNumber(roomPrice)}${currencyType}`}</span>
            <span className="room-info__period-of-time">{`в сутки`}</span>
          </p>
          <div className="room-info__room-rate">
            {/* +star-rating({
                            blockNumber: blockNumber,
                            checkedStarIndex: checkedStarIndex,
                        }) */}
            <p className="room-info__reviews-count">
              <span className="room-info__reviews-count-value">{reviewsCount}</span>
              <span className="room-info__reviews-count-text">Отзывов</span>
            </p>
          </div>
        </div>
        <div className="room-info__crud-forms-links">
          <CrudFormsLinks />
        </div>
      </div>
    );
  }
}

export default RoomInfo;
