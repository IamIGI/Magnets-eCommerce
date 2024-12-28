import { useEffect, useRef, useState } from 'react';
import { CART_DATA } from '../../mocks/PRODUCTS_MOCKS';
import StyledButton from '../ui/styledButton/StyledButton';
import c from './CartPreview.module.scss';
import CartItem from './cartItem/CartItem';
import {
  Cart as CartInterface,
  CartItem as CartItemInterface,
  ListItem,
} from '../../interfaces/cart';
import StyledIcon from '../ui/styledIcon/StyledIcon';
import Price from '../ui/price/Price';

interface CartProps {
  isVisible: boolean;
  onCloseCart: () => void;
}
const Cart: React.FC<CartProps> = ({ isVisible, onCloseCart }) => {
  const [data, setData] = useState<CartInterface>(() => {
    return {
      ...CART_DATA,
      items: CART_DATA.items.map((item) => {
        return { ...item, price: updatePrice(item) };
      }),
      totalPrice: cartTotalPrice({
        ...CART_DATA,
        items: CART_DATA.items.map((item) => {
          return { ...item, price: updatePrice(item) };
        }),
      }),
    };
  });
  const cartRef = useRef<HTMLDivElement>(null);

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
  });

  function updatePrice(itemData: CartItemInterface) {
    return itemData.size.price! * Number(itemData.quantity.desc);
  }

  function cartTotalPrice(cartData: CartInterface) {
    return cartData.items.reduce((acc, item) => acc + item.price, 0);
  }

  function handleSizeChange(itemId: string, size: ListItem) {
    setData((prevData) => {
      const newItems = prevData.items.map((item) => {
        if (item.id === itemId) {
          item.size = size;
          item.price = updatePrice(item);
          return { ...item };
        }
        return item;
      });
      return {
        ...prevData,
        items: newItems,
        totalPrice: cartTotalPrice({ ...prevData, items: newItems }),
      };
    });
  }

  function handleQuantityChange(itemId: string, quantity: ListItem) {
    setData((prevData) => {
      const newItems = prevData.items.map((item) => {
        if (item.id === itemId) {
          item.quantity = quantity;
          item.price = updatePrice(item);
          return { ...item };
        }
        return item;
      });
      return {
        ...prevData,
        items: newItems,
        totalPrice: cartTotalPrice({ ...prevData, items: newItems }),
      };
    });
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
            {data.items.map((item) => (
              <CartItem
                key={item.id}
                itemData={item}
                onSizeChange={handleSizeChange}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
        </div>
        <StyledButton upperCase={true}>
          <span style={{ paddingRight: '5px' }}>Do koszka </span>
          <Price price={data.totalPrice} as="p" />
        </StyledButton>
      </div>
    </>
  );
};

export default Cart;
