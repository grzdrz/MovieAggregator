import React from "react";
import FormInput from "../form-input/form-input";
import Button from "../button/button.jsx";
import Radio from "../radio/radio";

import "./create-form.scss";

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    const formBody = new FormData(this.form.current);
    const test = Array.from(formBody);
    const test2 = Object.fromEntries(test);
    this.props.createItem(test2);
  }

  render() {
    return (
      <form className="create-form" ref={this.form} onSubmit={this._handleSubmit}>
        <div className="create-form__name">
          <FormInput name="name" type="text" value="Торт с говном" title="Наименование" placeholder="Наименование" />
        </div>
        <div className="create-form__price">
          <div className="create-form__price-number">
            <FormInput name="price" type="number" value={1234} title="Цена" placeholder="Цена" />
          </div>
          <div className="create-form__currency-type">
            <FormInput name="currencyType" type="text" value="₽" title="Валюта" placeholder="Валюта" />
          </div>
        </div>
        <div className="create-form__manufacturer">
          <FormInput name="manufacturer" type="text" value="ООО и ко" title="Производитель" />
        </div>
        <div className="create-form__packaging">
          <Radio title="Тип фасовки"
            buttonsList={[
              { text: "поштучно", isChecked: false },
              { text: "взвешиванием", isChecked: true },
            ]} />
        </div>
        <div className="create-form__submit-button">
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

export default CreateForm;
