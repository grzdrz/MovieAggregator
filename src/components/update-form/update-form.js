import React from "react";
import FormInput from "../form-input/form-input";
import Button from "../button/button.jsx";
import Radio from "../radio/radio";

import "./update-form.scss";

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    const formBody = new FormData(this.form.current);
    const test = Array.from(formBody);
    const test2 = Object.fromEntries(test);
    this.props.updateItem(test2);
  }

  render() {
    const {
      id,
      name,
      price,
      currencyType,
      descriptions,
      manufacturer,
      energyValue,
      proteins,
      fats,
      carbohydrates,
      energyUnits,
      weightUnits,
      shelfLife,
      shelfLifeUnits,
      packaging,
      imageNames,
      checkedStars,
      reviewsCount,
    } = this.props.product;

    return (
      <form className="update-form" ref={this.form} onSubmit={this._handleSubmit}>
        <input type="hidden" name="id" defaultValue={id}></input>
        <div className="update-form__name">
          <FormInput name="name" type="text" value={name} title="Наименование" placeholder="Наименование" />
        </div>
        <div className="update-form__price">
          <div className="update-form__price-number">
            <FormInput name="price" type="number" value={price} title="Цена" placeholder="Цена" />
          </div>
          <div className="update-form__currency-type">
            <FormInput name="currencyType" type="text" value={currencyType} title="Валюта" placeholder="Валюта" />
          </div>
        </div>
        <div className="update-form__manufacturer">
          <FormInput name="manufacturer" type="text" value={manufacturer} title="Производитель" />
        </div>
        <div className="update-form__packaging">
          <Radio title="Тип фасовки"
            buttonsList={[
              { text: "поштучно", isChecked: packaging === "amount" },
              { text: "взвешиванием", isChecked: packaging === "weight" },
            ]} />
        </div>
        <div className="update-form__submit-button">
          <Button
            hasArrow={true}
            buttonType="submit"
            text="Отправить"
          />
        </div>
      </form>
    );
  }
}

export default UpdateForm;
