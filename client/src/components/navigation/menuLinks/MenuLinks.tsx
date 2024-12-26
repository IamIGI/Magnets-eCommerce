import { NavigationLinks } from '../../views/Root';
import StyledLink from '../styledLink/StyledLink';

interface MenuLinksInterface {
  mobileMenu?: boolean;
  handleClick: () => void;
}

const MenuLinks: React.FC<MenuLinksInterface> = ({
  mobileMenu,
  handleClick,
}) => {
  return (
    <>
      <StyledLink
        name="Produkty"
        url={NavigationLinks.ProductItem}
        handleClick={handleClick}
      />
      {mobileMenu && (
        <StyledLink name="KONTO" url="/" handleClick={handleClick} />
      )}
      <StyledLink name="Kontakt" url="/" handleClick={handleClick} />
      <StyledLink name="FAQ" url="/" handleClick={handleClick} />
    </>
  );
};

export default MenuLinks;
