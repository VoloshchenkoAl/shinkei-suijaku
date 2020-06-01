export type ButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'reset' | 'button';
  children: React.ReactNode;
};
