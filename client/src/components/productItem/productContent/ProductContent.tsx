import { useState } from 'react';
import c from './ProductContent.module.scss';
import priceUtils from '../../../utils/price.utils';
import StyledButton from '../../ui/styledButton/StyledButton';
import Price from '../../ui/price/Price';
import { PriceAndSizes } from '../../../api/magnetsServer/generated';
import { QUANTITY_ARR } from '../../../state/features/basket/basket.slice';

interface ProductContentProps {
  name: string;
  desc: string;
  priceAndSizes: PriceAndSizes[];
  handleAddProduct: (priceAndSizeId: string, quantity: number) => void;
}

const ProductContent: React.FC<ProductContentProps> = ({
  name,
  desc,
  priceAndSizes,
  handleAddProduct,
}) => {
  const [priceAndSizeId, setPriceAndSizeId] = useState<string>(
    priceAndSizes[0].id
  );
  const [quantity, setQuantity] = useState<number>(QUANTITY_ARR[0]);

  return (
    <div className={c.wrapper}>
      <h2>{name}</h2>
      <p>{desc}</p>
      <Price
        as="h3"
        price={priceUtils.calculatePrice(
          priceAndSizes,
          quantity,
          priceAndSizeId
        )}
      />
      <h4>ROZMIAR:</h4>
      <div className={c.optionsList}>
        {priceAndSizes.map((s) => (
          <button
            className={priceAndSizeId === s.id ? c.buttonSelected : undefined}
            key={s.id}
            onClick={() => setPriceAndSizeId(s.id)}
          >
            {s.size}
          </button>
        ))}
      </div>
      <h4>ILOŚĆ:</h4>
      <div className={c.optionsList}>
        {QUANTITY_ARR.map((q) => (
          <button
            className={q === quantity ? c.buttonSelected : undefined}
            key={q}
            onClick={() => setQuantity(q)}
          >
            {q}
          </button>
        ))}
      </div>
      <StyledButton
        upperCase={true}
        onClick={() => handleAddProduct(priceAndSizeId, quantity)}
      >
        Dodaj zdjęcie
      </StyledButton>
    </div>
  );
};

export default ProductContent;
