import { IMG_SIZES_ARR } from '../../../mocks/PRODUCTS_MOCKS';
import { BasketItem } from '../../../state/features/basket/basket.slice';
import Price from '../../ui/price/Price';
import c from './CartItem.module.scss';

interface CartItemProps {
  basketItem: BasketItem;
  onSizeChange: () => void;
  onQuantityChange: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ basketItem }) => {
  return (
    <div className={c.wrapper}>
      <img
        className={c.itemImage}
        src={`/products/${basketItem.product.imgNames[0]}`}
        alt={basketItem.product.imgNames[0]}
      />
      <div className={c.contentWrapper}>
        <div className={c.titleWrapper}>
          <h5>{basketItem.product.name}</h5>
          <Price price={basketItem.totalPrice} as="h5" />
        </div>

        <p>Rozmiar: {IMG_SIZES_ARR[0].desc}</p>
        <p>Ilość: 10</p>
      </div>
      <div className={c.actions}></div>
    </div>
  );
};

export default CartItem;
