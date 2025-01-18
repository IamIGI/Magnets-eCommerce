import { ButtonHTMLAttributes, ReactNode } from 'react';
import c from './StyledButton.module.scss';

interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  upperCase?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  upperCase = false,
  ...buttonProps
}) => {
  return (
    <button
      className={c.wrapper}
      style={upperCase ? { textTransform: 'uppercase' } : {}}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default StyledButton;
