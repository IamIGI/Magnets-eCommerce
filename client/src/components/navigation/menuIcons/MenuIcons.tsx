import React from 'react';
import StyledIcon from '../../ui/styledIcon/StyledIcon';
import LanguageMenu from '../languageMenu/LanguageMenu';

interface MenuIconsProps {
  onCartClick: () => void;
  mobileMenu?: boolean;
}

const MenuIcons: React.FC<MenuIconsProps> = ({
  onCartClick,
  mobileMenu = false,
}) => {
  return (
    <>
      <StyledIcon src="svg/media/facebook.svg" alt="fb" size="30px" />
      <StyledIcon src="svg/media/instagram.svg" alt="ig" size="30px" />
      {!mobileMenu && (
        <>
          <StyledIcon src="svg/buttons/user.svg" alt="user" size="30px" />
          <StyledIcon
            src="svg/buttons/basket.svg"
            alt="basket"
            size="30px"
            handleClick={onCartClick}
          />
          <LanguageMenu />
        </>
      )}
    </>
  );
};

export default MenuIcons;
