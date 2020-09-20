import React from 'react';
import './colored-logo.scss';

function ColoredLogo() {
  return (
    <div className='colored-logo'>
      <img
        className='colored-logo__logo-symbol'
        src='./src/components/colored-logo/images/colored-logo.svg'
        alt='Colored logotype'
      />
      <img
        className='colored-logo__logo-text'
        src='./src/components/colored-logo/images/TOXIN.svg'
        alt='TOXIN label'
      />
    </div>
  );
}

export default ColoredLogo;
