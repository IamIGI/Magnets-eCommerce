import {
  CartItem as CartItemsInterface,
  ListItem,
} from '../../../interfaces/cart';
import { IMG_SIZES_ARR } from '../../../mocks/PRODUCTS_MOCKS';
import Price from '../../ui/price/Price';
import c from './CartItem.module.scss';

interface CartItemProps {
  itemData: CartItemsInterface;
  onSizeChange: (itemId: string, size: ListItem) => void;
  onQuantityChange: (itemId: string, quantity: ListItem) => void;
}

const CartItem: React.FC<CartItemProps> = ({ itemData }) => {
  return (
    <div className={c.wrapper}>
      <img
        className={c.itemImage}
        src={`products/${itemData.imgName}`}
        alt={itemData.id}
      />
      <div className={c.contentWrapper}>
        <div className={c.titleWrapper}>
          <h5>{itemData.name}</h5>
          <Price price={itemData.price} as="h5" />
        </div>

        <p>Rozmiar: {IMG_SIZES_ARR[0].desc}</p>
        <p>Ilość: 10</p>
      </div>
      <div className={c.actions}></div>
    </div>
  );
};

export default CartItem;
