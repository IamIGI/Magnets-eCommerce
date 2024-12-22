import { useEffect, useRef, useState } from 'react';
import classes from './LanguageMenu.module.scss';

const LanguageMenu = () => {
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLangChange = () => {
    setMenuVisibility(!menuVisibility);
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
    <div className={classes.wrapper} ref={menuRef}>
      <button onClick={handleLangChange}>
        <img src="svg/lang/poland.svg" alt="pl-lang" />
      </button>
      <div
        className={`${classes.menu} ${menuVisibility ? classes.visible : ''}`}
      >
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