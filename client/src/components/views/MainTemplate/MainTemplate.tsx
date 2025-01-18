import React, { ReactNode } from 'react';
import { NavBar } from '../../navigation/navBar/NavBar';
import Footer from '../../sections/footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import CartPreview from '../../cart/CartPreview';
import { useToggleState } from '../../../hooks/useToggleState';

const MainTemplate: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCartVisible, toggleCartVisibility, setCartVisibility] =
    useToggleState(false);

  return (
    <BrowserRouter>
      <NavBar handleCartClick={toggleCartVisibility} />
      {children}
      <Footer />
      {/* SlideOutContent */}
      <CartPreview
        isVisible={isCartVisible}
        onCloseCart={() => setCartVisibility(false)}
      />
    </BrowserRouter>
  );
};

export default MainTemplate;
