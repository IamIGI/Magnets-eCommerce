import classes from './NavBar.module.scss';
import MobileNavigation from '../mobileNavigation/MobileNavigation';
import MenuLinks from '../menuLinks/MenuLinks';
import MenuIcons from '../menuIcons/MenuIcons';
import LanguageMenu from '../languageMenu/LanguageMenu';
import StyledIcon from '../styledIcon/StyledIcon';
import { useToggleState } from '../../../hooks/useToggleState';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationLinks } from '../../views/Root';

export const NavBar = () => {
  const [isMobileMenuVisible, toggleMobileMenuVisible, setMobileMenuVisible] =
    useToggleState(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close menu when click is outside of component
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuVisible(false);
      }
    };

    function handleResize() {
      if (window.innerWidth >= 800 && isMobileMenuVisible) {
        setMobileMenuVisible(false);
      }
    }

    function handleScroll() {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        if (!isMobileMenuVisible) {
          setIsScrolled(false);
        }
      }
    }

    if (isMobileMenuVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuVisible]);

  function handleMenuLinkClick() {
    console.log('handleMenuLinkClick');
    if (isMobileMenuVisible) setMobileMenuVisible(false);
  }

  function handleLogoCLick() {
    navigate(NavigationLinks.Home);

    if (isMobileMenuVisible) setMobileMenuVisible(false);
  }

  return (
    <div
      ref={mobileMenuRef}
      className={`${classes.navWrapper} ${isScrolled ? classes.scrolled : ''}`}
    >
      <nav className={classes.wrapper}>
        <button className={classes.logo} onClick={handleLogoCLick}>
          <img src="/logo/logo_black-no_background.png" alt="Logo" />
        </button>
        <div className={classes.mobileNavbar}>
          <LanguageMenu />
          <StyledIcon src="svg/buttons/basket2.svg" alt="basket" size="30px" />
          <StyledIcon
            src="svg/buttons/hamburger.svg"
            alt="Hamburger menu"
            size="35px"
            handleClick={toggleMobileMenuVisible}
          />
        </div>
        <div className={classes.links}>
          <MenuLinks handleClick={handleMenuLinkClick} />
        </div>
        <div className={classes.icons}>
          <MenuIcons />
        </div>
      </nav>
      <MobileNavigation
        isVisible={isMobileMenuVisible}
        handleLinkClick={handleMenuLinkClick}
      />
    </div>
  );
};
