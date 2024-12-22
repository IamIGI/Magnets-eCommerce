import LanguageMenu from '../languageMenu/LanguageMenu';
import StyledIcon from '../styledIcon/StyledIcon';
import StyledLink from '../styledLink/StyledLink';
import classes from './NavBar.module.scss';

export const NavBar = () => {
  return (
    <nav className={classes.wrapper}>
      <button className={classes.logo}>
        <img src="/logo/logo_black-no_background.png" alt="Logo" />
      </button>
      <div className={classes.links}>
        <StyledLink name="Produkty" url="/" />
        <StyledLink name="Kontakt" url="/" />
        <StyledLink name="FAQ" url="/" />
      </div>
      <div className={classes.icons}>
        <StyledIcon src="svg/media/facebook.svg" alt="fb" />
        <StyledIcon src="svg/media/instagram.svg" alt="ig" />
        <LanguageMenu />
      </div>
    </nav>
  );
};
