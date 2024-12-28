import { ReactNode } from 'react';
import c from './StyledButton.module.scss';

interface StyledButtonProps {
  children: ReactNode;
  upperCase?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  upperCase = false,
}) => {
  return (
    <button
      className={c.wrapper}
      style={upperCase ? { textTransform: 'uppercase' } : {}}
    >
      {children}
    </button>
  );
};

export default StyledButton;
