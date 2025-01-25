import React, { ReactNode, useEffect } from 'react';
import { NavBar } from '../../navigation/navBar/NavBar';
import Footer from '../../sections/footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import CartPreview from '../../cart/CartPreview';
import { useToggleState } from '../../../hooks/useToggleState';
import { useAppDispatch } from '../../../state/store';
import { getBasket } from '../../../state/features/basket/basket.slice';

const MainTemplate: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [isCartVisible, toggleCartVisibility, setCartVisibility] =
    useToggleState(false);

  useEffect(() => {
    dispatch(getBasket());
  }, [dispatch]);

  // store.subscribe(() => {
  //   console.log('x1');
  //   console.log(store.getState());
  // });

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
