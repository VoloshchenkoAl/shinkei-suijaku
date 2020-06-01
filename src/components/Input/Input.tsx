import React from 'react';

/* @Types */
import { InputProps } from './types';

const Input: React.FC<InputProps> = (props) => {
  const { onChange, value, label, type, error } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;

    onChange(inputValue);
  };

  return (
    <div>
      <label>
        <span>{label}</span>
        <br />
        <input type={type} value={value} onChange={handleChange} />
        <br />
        {!!error ? (
          <span style={{ color: 'tomato' }}>{error}</span>
        ) : null}
      </label>
    </div>
  );
};

Input.displayName = 'Input';
Input.defaultProps = {
  type: 'text',
};

export { Input };
