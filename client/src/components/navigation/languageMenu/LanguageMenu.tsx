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
  });

  return (
    <div className={c.wrapper} ref={menuRef}>
      <button onClick={handleLangChange}>
        <img src="svg/lang/poland.svg" alt="pl-lang" />
      </button>
      <div className={`${c.menu} ${menuVisibility ? c.visible : ''}`}>
        <ul>
          {['ukraine.svg', 'english.svg'].map((lang) => (
            <li key={lang}>
              <button onClick={handleLangChange}>
                <img src={`svg/lang/${lang}`} alt="lang" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageMenu;
