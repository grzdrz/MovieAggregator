import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../form-input/form-input.jsx';
import Button from '../button/button.jsx';
import Radio from '../radio/radio.jsx';
import './create-form.scss';

const defaultValues = {
  name: 'Чевапчичи',
  price: 123,
  currencyType: '₽',
  manufacturer: 'ООО Кекея',
};

function CreateForm(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const { createItemAction } = props;

    const formBody = new FormData(event.target);
    const test = Array.from(formBody);
    const test2 = Object.fromEntries(test);

    test2.id = Number.parseFloat(test2.id);
    test2.price = Number.parseFloat(test2.price);

    createItemAction(test2);
  };

  return (
    <form className='create-form' onSubmit={handleSubmit}>
      <div className='create-form__name'>
        <FormInput name='name' type='text' value={defaultValues.name} title='Наименование' placeholder='Наименование' />
      </div>
      <div className='create-form__price'>
        <div className='create-form__price-number'>
          <FormInput name='price' type='number' value={`${defaultValues.price}`} title='Цена' placeholder='Цена' />
        </div>
        <div className='create-form__currency-type'>
          <FormInput name='currencyType' type='text' value={defaultValues.currencyType} title='Валюта' placeholder='Валюта' />
        </div>
      </div>
      <div className='create-form__manufacturer'>
        <FormInput name='manufacturer' type='text' value={defaultValues.manufacturer} title='Производитель' />
      </div>
      <div className='create-form__packaging'>
        <Radio
          title='Тип фасовки'
          buttonsList={[
            { text: 'поштучно', isChecked: false },
            { text: 'взвешиванием', isChecked: true },
          ]}
        />
      </div>
      <div className='create-form__submit-button'>
        <Button
          hasArrow
          basisType='submit'
          text='Отправить'
        />
      </div>
    </form>
  );
}

CreateForm.propTypes = {
  createItemAction: PropTypes.func,
};

CreateForm.defaultProps = {
  createItemAction: () => { },
};

export default CreateForm;
