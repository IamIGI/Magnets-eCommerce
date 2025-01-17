import { useState } from 'react';
import c from './ProductContent.module.scss';
import priceUtils from '../../../utils/price.utils';
import StyledButton from '../../ui/styledButton/StyledButton';
import Price from '../../ui/price/Price';
import { PriceAndSizes } from '../../../api/magnetsServer/generated';

const QUANTITY_ARR = [
  { id: '1', desc: '1' },
  { id: '4', desc: '4' },
  { id: '10', desc: '10' },
  { id: '20', desc: '20' },
  { id: '30', desc: '30' },
  { id: '40', desc: '40' },
  { id: '50', desc: '50' },
  { id: '60', desc: '60' },
  { id: '70', desc: '70' },
  { id: '80', desc: '80' },
  { id: '90', desc: '90' },
  { id: '100', desc: '100' },
  { id: '150', desc: '150' },
  { id: '200', desc: '200' },
  { id: '250', desc: '250' },
];

interface ProductContentProps {
  name: string;
  // category: ProductCategory;
  desc: string;
  priceAndSizes: PriceAndSizes[];
}

const ProductContent: React.FC<ProductContentProps> = ({
  name,
  // category,
  desc,
  priceAndSizes,
}) => {
  const [sizeId, setSizeId] = useState<string>(priceAndSizes[0].id);
  const [quantityId, setQuantityId] = useState<string>(QUANTITY_ARR[0].id);

  return (
    <div className={c.wrapper}>
      <h2>{name}</h2>
      <p>{desc}</p>
      <Price
        as="h3"
        price={priceUtils.calculatePrice(
          priceAndSizes,
          QUANTITY_ARR,
          sizeId,
          quantityId
        )}
      />
      <h4>ROZMIAR:</h4>
      <div className={c.optionsList}>
        {priceAndSizes.map((s) => (
          <button
            className={sizeId === s.id ? c.buttonSelected : undefined}
            key={s.id}
            onClick={() => setSizeId(s.id)}
          >
            {s.size}
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
