import classes from './NavBar.module.scss';
import MobileNavigation from '../mobileNavigation/MobileNavigation';
import MenuLinks from '../menuLinks/MenuLinks';
import MenuIcons from '../menuIcons/MenuIcons';
import LanguageMenu from '../languageMenu/LanguageMenu';
import StyledIcon from '../styledIcon/StyledIcon';
import { useToggleState } from '../../../hooks/useToggleState';
import { useEffect } from 'react';

export const NavBar = () => {
  const [isMobileMenuVisible, toggleMobileMenuVisible, setMobileMenuVisible] =
    useToggleState(false);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  function handleResize() {
    if (window.innerWidth >= 800 && isMobileMenuVisible) {
      setMobileMenuVisible(false);
    }
  }

  return (
    <>
      <nav className={classes.wrapper}>
        <button className={classes.logo}>
          <img src="/logo/logo_black-no_background.png" alt="Logo" />
        </button>
        <div className={classes.mobileNavbar}>
          <LanguageMenu />
          <StyledIcon
            src="svg/buttons/hamburger.svg"
            alt="Hamburger menu"
            size="60px"
            handleClick={toggleMobileMenuVisible}
          />
        </div>
        <div className={classes.links}>
          <MenuLinks />
        </div>
        <div className={classes.icons}>
          <MenuIcons />
        </div>
      </nav>
      <MobileNavigation isVisible={isMobileMenuVisible} />
    </>
  );
};
