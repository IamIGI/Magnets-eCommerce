import { useEffect, useRef } from 'react';
import c from './LanguageMenu.module.scss';
import { useToggleState } from '../../../hooks/useToggleState';

const LanguageMenu = () => {
  const [menuVisibility, toggleMenuVisibility, setMenuVisibility] =
    useToggleState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLangChange = () => {
    toggleMenuVisibility();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close menu when click is outside of component
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisibility(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={c.wrapper} ref={menuRef}>
      <button onClick={handleLangChange}>
        <img src="svg/lang/poland.svg" alt="pl-lang" />
      </button>
      <div className={`${c.menu} ${menuVisibility ? c.visible : ''}`}>
        <ul>
          <li>
            <button onClick={handleLangChange}>
              <img src="svg/lang/ukraine.svg" alt="ua-lang" />
            </button>
          </li>
          <li>
            <button onClick={handleLangChange}>
              <img src="svg/lang/english.svg" alt="en-lang" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LanguageMenu;
