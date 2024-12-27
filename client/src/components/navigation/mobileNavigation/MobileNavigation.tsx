import MenuIcons from '../menuIcons/MenuIcons';
import MenuLinks from '../menuLinks/MenuLinks';

import c from './MobileNavigation.module.scss';

interface MobileNavigationProps {
  isVisible: boolean;
  handleLinkClick: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isVisible,
  handleLinkClick,
}) => {
  return (
    <div className={`${c.wrapper} ${isVisible ? c.visible : ''}`}>
      <div className={c.links}>
        <MenuLinks mobileMenu={true} handleClick={handleLinkClick} />
      </div>
      <div className={c.icons}>
        <MenuIcons mobileMenu={true} />
      </div>
    </div>
  );
};

export default MobileNavigation;
