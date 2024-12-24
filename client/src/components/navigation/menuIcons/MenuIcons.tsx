import React from 'react';
import StyledIcon from '../styledIcon/StyledIcon';
import LanguageMenu from '../languageMenu/LanguageMenu';

const MenuIcons: React.FC<{ mobileMenu?: boolean }> = ({
  mobileMenu = false,
}) => {
  return (
    <>
      <StyledIcon src="svg/media/facebook.svg" alt="fb" size="30px" />
      <StyledIcon src="svg/media/instagram.svg" alt="ig" size="30px" />
      {!mobileMenu && (
        <>
          <StyledIcon src="svg/buttons/user.svg" alt="user" size="30px" />
          <StyledIcon src="svg/buttons/basket.svg" alt="basket" size="30px" />
          <LanguageMenu />
        </>
      )}
    </>
  );
};

export default MenuIcons;
