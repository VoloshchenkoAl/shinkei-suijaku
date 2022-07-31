/* @Styles */
import './button.css';

type ButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'reset' | 'button';
  children: React.ReactNode;
};

function Button(props: ButtonProps) {
  const { children, onClick, type = 'button' } = props;

  return (
    <button type={type} className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
