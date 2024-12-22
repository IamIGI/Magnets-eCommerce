import React from 'react';
import StyledIcon from '../styledIcon/StyledIcon';
import LanguageMenu from '../languageMenu/LanguageMenu';

const MenuIcons: React.FC<{ mobileMenu?: boolean }> = ({
  mobileMenu = false,
}) => {
  return (
    <>
      <StyledIcon src="svg/media/facebook.svg" alt="fb" />
      <StyledIcon src="svg/media/instagram.svg" alt="ig" />
      {!mobileMenu && <LanguageMenu />}
    </>
  );
};

export default MenuIcons;
