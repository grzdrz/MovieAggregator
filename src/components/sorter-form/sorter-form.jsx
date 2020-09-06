import React from 'react';

import CheckboxList from '../checkbox-list/checkbox-list.jsx';

import './sorter-form.scss';

class SorterForm extends React.Component {
  handleSorterClick = (event) => {
    const { sorter } = this.props;

    const input = event.currentTarget;
    const form = input.closest('form');
    const formBody = new FormData(form);
    const test = Array.from(formBody);
    const result = test.map((pair) => {
      const splitedWord = pair[0].split('checkbox-list_');
      return splitedWord[1];
    });

    sorter(result);
  }

  handleFilterByCategoryClick = (event) => {
    const { filterByCategory } = this.props;

    const input = event.currentTarget;
    const form = input.closest('form');
    const formBody = new FormData(form);
    const test = Array.from(formBody);
    const result = test.map((pair) => {
      const splitedWord = pair[0].split('checkbox-list_');
      return splitedWord[1];
    });

    filterByCategory(result);
  }

  render() {
    const {
      sorters,
      filters,
    } = this.props;

    return (
      <form className='sorter-form' onSubmit={(event) => { event.preventDefault() }}>
        <div className='sorter-form__checkbox-list_type_sorter'>
          <CheckboxList
            inputClick={this.handleSorterClick}
            list={[
              { isChecked: sorters.includes('price'), text: 'Цена', name: 'price' },
              { isChecked: sorters.includes('reviewsCount'), text: 'Отзывы', name: 'reviewsCount' },
              { isChecked: sorters.includes('name'), text: 'Имени', name: 'name' },
            ]}
          />
        </div>
        <div className='sorter-form__checkbox-list_type_filter-by-category'>
          <CheckboxList
            inputClick={this.handleFilterByCategoryClick}
            title='Категория продукта:'
            list={[
              { isChecked: filters.byCategory.includes('meat'), text: 'Мясо', name: 'meat' },
              { isChecked: filters.byCategory.includes('fish'), text: 'Рыба', name: 'fish' },
              { isChecked: filters.byCategory.includes('milk'), text: 'Кисломолочное изделие', name: 'milk' },
              { isChecked: filters.byCategory.includes('fruit'), text: 'Фрукт', name: 'fruit' },
              { isChecked: filters.byCategory.includes('berry'), text: 'Ягода', name: 'berry' },
            ]}
          />
        </div>
      </form>
    );
  }
}

export default SorterForm;
