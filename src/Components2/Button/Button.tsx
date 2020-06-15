import React from 'react';

/* @Types */
import { ButtonProps } from './types';

/* @Styles */
import './Button.css';

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const { children, onClick, type } = props;

  return (
    <button type={type} className="button" onClick={onClick}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
};

export { Button };
