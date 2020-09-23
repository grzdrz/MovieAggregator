/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';

import CheckboxList from '../checkbox-list/checkbox-list.jsx';

import FiltersType from '../../store/Filters/FilersType';
import defaultFilters from '../../store/Filters/initialState';

import './sorter-form.scss';

function SorterForm(props) {
  const {
    filters,
    sorterAction,
    filterByCategoryAction,
  } = props;

  const handleSorterClick = (event) => {
    const input = event.currentTarget;
    const form = input.closest('form');
    const formBody = new FormData(form);
    const test = Array.from(formBody);
    const result = test
      .map((pair) => {
        const splitedWord = pair[0].split('checkbox-list_sorters_');
        return splitedWord[1];
      })
      .filter((pair) => pair !== undefined);

    sorterAction(result);
  };

  const handleFilterByCategoryClick = (event) => {
    const input = event.currentTarget;
    const form = input.closest('form');
    const formBody = new FormData(form);
    const test = Array.from(formBody);
    const result = test
      .map((pair) => {
        const splitedWord = pair[0].split('checkbox-list_by-category_');
        return splitedWord[1];
      })
      .filter((pair) => pair !== undefined);

    filterByCategoryAction(result);
  };

  return (
    <form className='sorter-form' onSubmit={(event) => { event.preventDefault(); }}>
      <div className='sorter-form__checkbox-list_type_sorter'>
        <CheckboxList
          inputClick={handleSorterClick}
          title='Сортировать по:'
          list={[
            { isChecked: filters.sorters.includes('price'), text: 'Цена', name: 'price', type: 'sorters' },
            { isChecked: filters.sorters.includes('reviewsCount'), text: 'Отзывы', name: 'reviewsCount', type: 'sorters' },
            { isChecked: filters.sorters.includes('name'), text: 'Название', name: 'name', type: 'sorters' },
          ]}
        />
      </div>
      <div className='sorter-form__checkbox-list_type_filter-by-category'>
        <CheckboxList
          inputClick={handleFilterByCategoryClick}
          title='Категория продукта:'
          list={[
            { isChecked: filters.byCategory.includes('meat'), text: 'Мясо', name: 'meat', type: 'by-category' },
            { isChecked: filters.byCategory.includes('fish'), text: 'Рыба', name: 'fish', type: 'by-category' },
            { isChecked: filters.byCategory.includes('milk'), text: 'Кисломолочное изделие', name: 'milk', type: 'by-category' },
            { isChecked: filters.byCategory.includes('fruit'), text: 'Фрукт', name: 'fruit', type: 'by-category' },
            { isChecked: filters.byCategory.includes('berry'), text: 'Ягода', name: 'berry', type: 'by-category' },
          ]}
        />
      </div>
    </form>
  );
}

SorterForm.propTypes = {
  filters: FiltersType,
  sorterAction: PropTypes.func,
  filterByCategoryAction: PropTypes.func,
};

SorterForm.defaultProps = {
  filters: defaultFilters,
  sorterAction: () => { },
  filterByCategoryAction: () => { },
};

export default SorterForm;
