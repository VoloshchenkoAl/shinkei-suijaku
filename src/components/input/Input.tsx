/* @Styles */
import './input.css';

type InputProps = {
  onChange: (value: string) => void;
  value: string;
  label?: string;
  type?: string;
  error?: string;
};

function Input(props: InputProps) {
  const { onChange, value, label, type = 'text', error } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;

    onChange(inputValue);
  };

  return (
    <div>
      <label>
        {!label ? null : <span>{label}</span>}
        <input
          className="input"
          type={type}
          value={value}
          onChange={handleChange}
        />
        {!error ? null : (
          <>
            <br />
            <span style={{ color: 'tomato' }}>{error}</span>
          </>
        )}
      </label>
    </div>
  );
}

export default Input;
