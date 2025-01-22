import React from 'react';
import c from './StyledQuantity.module.scss';

interface StyledQuantityButtonProps {
  value: string;
  onValueChange: (operation: '+' | '-') => void;
}

const StyledQuantityButton: React.FC<StyledQuantityButtonProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <div className={c.wrapper}>
      <button onClick={() => onValueChange('-')}>-</button>
      <div className={c.value}>{value}</div>
      <button onClick={() => onValueChange('+')}>+</button>
    </div>
  );
};

export default StyledQuantityButton;
