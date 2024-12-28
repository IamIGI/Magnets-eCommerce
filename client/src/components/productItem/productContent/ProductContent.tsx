import { useState } from 'react';
import c from './ProductContent.module.scss';
import priceUtils from '../../../utils/price.utils';
import StyledButton from '../../ui/styledButton/StyledButton';
import {
  IMG_SIZES_ARR,
  PRODUCT_DATA,
  QUANTITY_ARR,
} from '../../../mocks/PRODUCTS_MOCKS';
import Price from '../../ui/price/Price';

const ProductContent = () => {
  const [sizeId, setSizeId] = useState<string>(IMG_SIZES_ARR[0].id);
  const [quantityId, setQuantityId] = useState<string>(QUANTITY_ARR[0].id);

  return (
    <div className={c.wrapper}>
      <h2>{PRODUCT_DATA.name}</h2>
      <p>{PRODUCT_DATA.description}</p>
      <Price
        as="h3"
        price={priceUtils.calculatePrice(
          IMG_SIZES_ARR,
          QUANTITY_ARR,
          sizeId,
          quantityId
        )}
      />
      <h4>ROZMIAR:</h4>
      <div className={c.optionsList}>
        {IMG_SIZES_ARR.map((s) => (
          <button
            className={sizeId === s.id ? c.buttonSelected : undefined}
            key={s.id}
            onClick={() => setSizeId(s.id)}
          >
            {s.desc}
          </button>
        ))}
      </div>
      <h4>ILOŚĆ:</h4>
      <div className={c.optionsList}>
        {QUANTITY_ARR.map((q) => (
          <button
            className={quantityId === q.id ? c.buttonSelected : undefined}
            key={q.id}
            onClick={() => setQuantityId(q.id)}
          >
            {q.desc}
          </button>
        ))}
      </div>
      <StyledButton upperCase={true}>Dodaj zdjęcie</StyledButton>
    </div>
  );
};

export default ProductContent;
