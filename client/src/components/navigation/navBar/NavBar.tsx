import StyledLink from '../styledLink/StyledLink';
import classes from './NavBar.module.scss';

export const NavBar = () => {
  return (
    <div className={classes.wrapper}>
      <StyledLink name="Produkty" url="/" />
      <StyledLink name="Kontakt" url="/" />
      <StyledLink name="FAQ" url="/" />
    </div>
  );
};
