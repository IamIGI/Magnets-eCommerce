import { NavigationLinks } from '../../views/Root';
import StyledLink from '../styledLink/StyledLink';

interface MenuLinksInterface {
  mobileMenu?: boolean;
}

const MenuLinks: React.FC<MenuLinksInterface> = ({ mobileMenu }) => {
  return (
    <>
      <StyledLink name="Produkty" url={NavigationLinks.ProductItem} />
      {mobileMenu && <StyledLink name="KONTO" url="/" />}
      <StyledLink name="Kontakt" url="/" />
      <StyledLink name="FAQ" url="/" />
    </>
  );
};

export default MenuLinks;
