import { BasketItem } from '../../../api/magnetsServer/generated';
import Price from '../../ui/price/Price';
import StyledQuantityButton from '../../ui/styledQuantityButton/StyledQuantityButton';
import c from './CartItem.module.scss';

interface CartItemProps {
  basketItem: BasketItem;
  onQuantityChange: (
    operation: '+' | '-',
    productId: string,
    priceAndSizeId: string
  ) => void;
  onSizeRemove: (productId: string, priceAndSizeId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  basketItem,
  onQuantityChange,
  onSizeRemove,
}) => {
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

        {basketItem.priceAndSizesArray.map((psItem) => (
          <div className={c.actionWrapper} key={psItem.item.id}>
            <h5> {psItem.item.size}</h5>
            <StyledQuantityButton
              value={psItem.quantity.toString()}
              onValueChange={(operation) =>
                onQuantityChange(
                  operation,
                  basketItem.product.id,
                  psItem.item.id
                )
              }
            />
            <button
              className={`${c.removeIcon} hover-effect`}
              onClick={() =>
                onSizeRemove(basketItem.product.id, psItem.item.id)
              }
            >
              <img src={'/svg/buttons/delete.svg'} alt="delete" />
            </button>
          </div>
        ))}
      </div>
      <div className={c.actions}></div>
    </div>
  );
};

export default CartItem;
