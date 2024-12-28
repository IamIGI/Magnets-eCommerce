import MenuIcons from '../menuIcons/MenuIcons';
import MenuLinks from '../menuLinks/MenuLinks';

import c from './MobileNavigation.module.scss';

interface MobileNavigationProps {
  isVisible: boolean;
  handleClick: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isVisible,
  handleClick,
}) => {
  return (
    <div className={`${c.wrapper} ${isVisible ? c.visible : ''}`}>
      <div className={c.links}>
        <MenuLinks mobileMenu={true} handleClick={handleClick} />
      </div>
      <div className={c.icons}>
        <MenuIcons mobileMenu={true} onCartClick={handleClick} />
      </div>
    </div>
  );
};

export default MobileNavigation;
