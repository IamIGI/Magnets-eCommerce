import { useEffect, useRef } from 'react';
import StyledButton from '../ui/styledButton/StyledButton';
import c from './CartPreview.module.scss';
import CartItem from './cartItem/CartItem';
import StyledIcon from '../ui/styledIcon/StyledIcon';
import Price from '../ui/price/Price';
import { useAppDispatch, useAppSelector } from '../../state/store';
import {
  changeBasketItemQuantity,
  removeBasketItemSize,
} from '../../state/features/basket/basket.slice';

interface CartProps {
  isVisible: boolean;
  onCloseCart: () => void;
}
const Cart: React.FC<CartProps> = ({ isVisible, onCloseCart }) => {
  const cartRef = useRef<HTMLDivElement>(null);
  const basketData = useAppSelector((state) => state.basket.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close menu when click is outside of component
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onCloseCart();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [basketData]);

  function handleRemoveSize(productId: string, priceAndSizeId: string) {
    dispatch(removeBasketItemSize({ productId, priceAndSizeId }));
  }

  function handleQuantityChange(
    operation: '+' | '-',
    productId: string,
    priceAndSizeId: string
  ) {
    dispatch(
      changeBasketItemQuantity({ productId, priceAndSizeId, operation })
    );
  }

  return (
    <>
      {/* Curtain effect */}
      <div
        className={`${c.backdrop} ${isVisible ? c.visible : ''}`}
        onClick={onCloseCart}
      />
      <div
        ref={cartRef}
        className={`${c.wrapper} ${isVisible ? c.visible : ''}`}
      >
        <div className={c.mainContent}>
          <div className={c.header}>
            <h3>Koszyk</h3>
            <StyledIcon
              src="svg/buttons/close.svg"
              alt="close"
              size="25px"
              handleClick={onCloseCart}
            />
          </div>
          <div className={c.productsList}>
            {basketData.products.map((product) => (
              <CartItem
                key={product.product.id}
                basketItem={product}
                onSizeRemove={handleRemoveSize}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
        </div>
        <StyledButton upperCase={true}>
          <span style={{ paddingRight: '5px' }}>Do koszka </span>
          <Price price={basketData.totalPrice} as="p" />
        </StyledButton>
      </div>
    </>
  );
};

export default Cart;
