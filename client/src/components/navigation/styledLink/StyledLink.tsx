import { NavLink } from 'react-router-dom';
import classes from './StyledLink.module.scss';

interface LinkProps {
  name: string;
  url: string;
}

const StyledLink = ({ name, url }: LinkProps) => {
  return (
    <NavLink
      to={url}
      className={classes.btnFlip}
      data-back={name}
      data-front={name}
    />
  );
};

export default StyledLink;
