import React from 'react';

/* @Types */
import { InputProps } from './types';

/* @Styles */
import './Input.css';

const Input: React.FunctionComponent<InputProps> = (props) => {
  const { onChange, value, label, type, error } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;

    onChange(inputValue);
  };

  return (
    <div>
      <label>
        {!!label ? <span>{label}</span> : null}
        <input
          className="input"
          type={type}
          value={value}
          onChange={handleChange}
        />
        {!!error ? (
          <>
            <br />
            <span style={{ color: 'tomato' }}>{error}</span>
          </>
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
