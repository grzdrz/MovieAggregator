import React from 'react';
import PropTypes from 'prop-types';

import FormInput from '../form-input/form-input.jsx';
import Button from '../button/button.jsx';
import Radio from '../radio/radio.jsx';

import ProductType from '../../store/Products/ProductType';

import './update-form.scss';

function UpdateForm(props) {
  const {
    product,
    updateItemAction,
  } = props;
  const {
    id,
    name,
    price,
    currencyType,
    /* descriptions, */
    manufacturer,
    /* energyValue,
    proteins,
    fats,
    carbohydrates,
    energyUnits,
    weightUnits,
    shelfLife,
    shelfLifeUnits, */
    packaging,
    /* imageNames,
    checkedStars,
    reviewsCount, */
  } = product;

  const handleSubmit = (event) => {
    event.preventDefault();

    const formBody = new FormData(event.target);
    const test = Array.from(formBody);
    const test2 = Object.fromEntries(test);

    test2.id = Number.parseFloat(test2.id);
    test2.price = Number.parseFloat(test2.price);

    updateItemAction(test2);
  };

  return (
    <form className='update-form' onSubmit={handleSubmit}>
      <input type='hidden' name='id' defaultValue={id} />
      <div className='update-form__name'>
        <FormInput name='name' type='text' value={name} title='Наименование' placeholder='Наименование' />
      </div>
      <div className='update-form__price'>
        <div className='update-form__price-number'>
          <FormInput name='price' type='number' value={price} title='Цена' placeholder='Цена' />
        </div>
        <div className='update-form__currency-type'>
          <FormInput name='currencyType' type='text' value={currencyType} title='Валюта' placeholder='Валюта' />
        </div>
      </div>
      <div className='update-form__manufacturer'>
        <FormInput name='manufacturer' type='text' value={manufacturer} title='Производитель' />
      </div>
      <div className='update-form__packaging'>
        <Radio
          title='Тип фасовки'
          buttonsList={[
            { text: 'поштучно', isChecked: packaging === 'amount' },
            { text: 'взвешиванием', isChecked: packaging === 'weight' },
          ]}
        />
      </div>
      <div className='update-form__submit-button'>
        <Button
          hasArrow
          basisType='submit'
          text='Отправить'
        />
      </div>
    </form>
  );
}

UpdateForm.propTypes = {
  product: ProductType,
  updateItemAction: PropTypes.func,
};

UpdateForm.defaultProps = {
  product: {},
  updateItemAction: () => { },
};

export default UpdateForm;
