/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import UpdateForm from '../update-form/update-form.jsx';
import './update-button.scss';

class UpdateButton extends React.Component {
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
    const button = event.target.closest('.update-button');
    const submitButton = event.target.closest('.update-form__submit-button');
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
      updateForm.classList.toggle('update-button__form_opened', true);
    } else {
      updateForm.classList.toggle('update-button__form_opened', false);
    }
  }

  // eslint-disable-next-line react/sort-comp
  componentWillUnmount() {
    document.removeEventListener('click', this.handleDropdownLeave);
  }

  render() {
    const {
      product,
      updateItem,
    } = this.props;
    return (
      <div className='update-button'>
        <div className='update-button__button-container' onClick={this._handlePlusWindowClick} ref={this.plusButton}>
          <span className='update-button__horizontal-part' />
          <span className='update-button__vertical-part' />
        </div>
        <div className='update-button__form' ref={this.updateForm}>
          <UpdateForm
            product={product}
            updateItem={updateItem}
          />
        </div>
      </div>
    );
  }
}

export default UpdateButton;
