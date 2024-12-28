import { useEffect, useRef } from 'react';
import { useToggleState } from '../../../hooks/useToggleState';
import c from './StyledList.module.scss';
import { ListItem } from '../../../interfaces/cart';

interface StyledListProps {
  selectedValue: ListItem;
  values: ListItem[];
  onSelect: (value: ListItem) => void;
  title?: { desc: string; position: 'top' | 'left' };
}

const StyledList: React.FC<StyledListProps> = ({
  selectedValue,
  values,
  onSelect,
  title = undefined,
}) => {
  const [isOpen, toggleIsOpen, setIsOpen] = useToggleState(false);
  const listRef = useRef<HTMLDivElement>(null);

  function handleSelect(value: ListItem) {
    onSelect(value);
    toggleIsOpen();
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close menu when click is outside of component
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div ref={listRef} className={c.wrapper}>
      <div
        className={c.selectedWrapper}
        style={{ flexDirection: title?.position === 'left' ? 'row' : 'column' }}
      >
        {title && <p>{title.desc}</p>}
        <button
          className={` ${isOpen ? c.selectedIsOpen : ''}`}
          onClick={toggleIsOpen}
        >
          {selectedValue.desc}
          <img src="svg/buttons/arrowDown.svg" alt="arrow-down" />
        </button>
      </div>
      <div className={`${c.menu} ${isOpen ? c.visible : ''}`}>
        <ul>
          {values.map((value) => (
            <li key={value.id}>
              <button onClick={() => handleSelect(value)}>{value.desc}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StyledList;
