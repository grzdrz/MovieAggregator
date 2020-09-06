import React from 'react';
import './star-rating.scss';

function StarRating(props) {
  const {
    id = 0,
    checkedStars = 0,
  } = props;
  const iterator = [0, 0, 0, 0, 0];

  return (
    <div className='star-rating'>
      {iterator.map((value, i) => (
        <React.Fragment key={`star-rating__${5 - i}`}>
          <input
            className='star-rating__input'
            type='radio'
            name={`star-rating-${id}`}
            value={5 - i}
            defaultChecked={checkedStars === (5 - i)}
          />
          <div className='star-rating__image' title={`Оценка «${5 - i}»`} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default StarRating;
