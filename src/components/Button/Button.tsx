import React from 'react';

/* @Types */
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = (props) => {
  const { children, onClick, type } = props;

  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
};

export { Button };
