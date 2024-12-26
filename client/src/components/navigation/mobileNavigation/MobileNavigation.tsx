import MenuIcons from '../menuIcons/MenuIcons';
import MenuLinks from '../menuLinks/MenuLinks';

import classes from './MobileNavigation.module.scss';

interface MobileNavigationProps {
  isVisible: boolean;
  handleLinkClick: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isVisible,
  handleLinkClick,
}) => {
  return (
    <div className={`${classes.wrapper} ${isVisible ? classes.visible : ''}`}>
      <div className={classes.links}>
        <MenuLinks mobileMenu={true} handleClick={handleLinkClick} />
      </div>
      <div className={classes.icons}>
        <MenuIcons mobileMenu={true} />
      </div>
    </div>
  );
};

export default MobileNavigation;
