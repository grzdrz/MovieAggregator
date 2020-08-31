import React from "react";

import CheckboxList from "../checkbox-list/checkbox-list";

import "./sorter-form.scss";

class SorterForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleCheckboxListClick = this.handleCheckboxListClick.bind(this);
  }

  handleCheckboxListClick(event) {
    const input = event.currentTarget;
    const form = input.closest("form");
    const formBody = new FormData(form);
    const test = Array.from(formBody);
    const result = test.map((pair) => {
      const splitedWord = pair[0].split("checkbox-list_");
      return splitedWord[1];
    })
    this.props.sorter(result);
  }

  render() {
    const {
      sorters,
    } = this.props;
    return (
      <form className="sorter-form" onSubmit={this.handleSubmit}>
        <div className="sorter-form__checkbox-list">
          <CheckboxList
            inputClick={this.handleCheckboxListClick}
            list={[
              { isChecked: sorters.includes("price"), text: "Цена", name: "price" },
              { isChecked: sorters.includes("reviewsCount"), text: "Отзывы", name: "reviewsCount" },
              { isChecked: sorters.includes("name"), text: "Имени", name: "name" },
            ]}
          />
        </div>
      </form>
    );
  }
}

export default SorterForm;
