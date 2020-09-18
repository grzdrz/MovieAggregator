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
    document.addEventListener('click', this.handleDropdownLeave);
    this._changeState();
  }

  handleDropdownLeave = (event) => {
    const button = event.target.closest('.create-button');
    const submitButton = event.target.closest('.create-form__submit-button');
    if (!button || submitButton) {
      this.isOpened = false;
      this._changeState();
    }
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
    document.removeEventListener('click', this.handleDropdownLeave);
  }

  render() {
    const { createItemAction } = this.props;

    return (
      <div className='create-button'>
        <div className='create-button__form' ref={this.updateForm}>
          <CreateForm createItemAction={createItemAction} />
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
