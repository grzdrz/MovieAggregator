import React from 'react';
import CreateForm from '../create-form/create-form.jsx';
import './create-button.scss';

class CreateButton extends React.Component {
  constructor(props) {
    super(props);
    this.isOpened = false;
    this.plusButton = React.createRef();
    this.updateForm = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this._handleDropdownLeave);
    this._changeState();
  }

  _handleDropdownLeave = (event) => {
    if (event.target.className.match) {
      const updateForm = event.target.className.match(
        /(^create-button)|(^create-button__)|(^create-form)|(^form-input)|(^radio)/,
      );
      if (!updateForm) {
        this._handleCloseDropdown();
      }
    } else this._handleCloseDropdown();
  }

  _handleCloseDropdown = () => {
    this.isOpened = false;
    this._changeState();
  }

  _handlePlusWindowClick = () => {
    this.isOpened = true;
    this._changeState();
  }

  _changeState() {
    const updateForm = this.updateForm.current;
    if (this.isOpened) {
      updateForm.classList.toggle('create-button__form_opened', true);
    } else {
      updateForm.classList.toggle('create-button__form_opened', false);
    }
  }

  // eslint-disable-next-line react/sort-comp
  componentWillUnmount() {
    document.removeEventListener('click', this._handleDropdownLeave);
  }

  render() {
    const { createItem } = this.props;

    return (
      <div className='create-button'>
        <div className='create-button__form' ref={this.updateForm}>
          <CreateForm createItem={createItem} />
        </div>
        <button
          className='create-button__button-container'
          onClick={this._handlePlusWindowClick}
          ref={this.plusButton}
          type='button'
        >
          <span className='create-button__text'>Создать элемент</span>
        </button>
      </div>
    );
  }
}

export default CreateButton;
