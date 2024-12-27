import { NavLink } from 'react-router-dom';
import c from './StyledLink.module.scss';

interface LinkProps {
  name: string;
  url: string;
  handleClick?: () => void;
}

const StyledLink = ({ name, url, handleClick }: LinkProps) => {
  return (
    <NavLink
      to={url}
      className={c.btnFlip}
      data-back={name}
      data-front={name}
      onClick={handleClick}
    />
  );
};

export default StyledLink;
