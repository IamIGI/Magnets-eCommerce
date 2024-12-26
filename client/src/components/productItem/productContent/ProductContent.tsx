import { useEffect, useState } from 'react';
import { Product } from '../../../api/magnetsServer/generated';
import c from './ProductContent.module.scss';
import priceUtils from '../../../utils/price.utils';

const PRODUCT_DATA: Product = {
  id: crypto.randomUUID(),
  name: 'Product Name',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nullam nec nunc nec nunc.',
  imgName: 'productItem_1.jpg',
  createDate: new Date(),
  editDate: new Date(),
  price: {
    defaultPrice: 10,
    editDate: new Date(),
    discountPrice: 9,
    lowestPrice30day: 5,
  },
};
const SIZES = [
  { id: '6.8x6.8', desc: '6,8 x 6,8 cm', price: 2.9 },
  { id: '9.5x6.8', desc: '9,5 x 6,8 cm', price: 5 },
  { id: '9.5x9.5', desc: '9,5 x 9,5 cm', price: 7.2 },
  { id: '10x14', desc: '10 x 14 cm', price: 9.1 },
];
const QUANTITY = [1, 4, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250];
const ProductContent = () => {
  const [sizeId, setSizeId] = useState<string>(SIZES[0].id);
  const [quantity, setQuantity] = useState<number>(QUANTITY[0]);
  const [price, setPrice] = useState<number>(SIZES[0].price);

  useEffect(() => {
    setPrice(priceUtils.calculatePrice(SIZES, sizeId, quantity));
  }, [sizeId, quantity]);

  return (
    <div className={c.wrapper}>
      <h2>{PRODUCT_DATA.name}</h2>
      <p>{PRODUCT_DATA.description}</p>
      <h3>{priceUtils.displayPrice(price)} zł</h3>
      <h4>ROZMIAR:</h4>
      <div className={c.optionsList}>
        {SIZES.map((s) => (
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
        {QUANTITY.map((q) => (
          <button
            className={quantity === q ? c.buttonSelected : undefined}
            key={q}
            onClick={() => setQuantity(q)}
          >
            {q}
          </button>
        ))}
      </div>
      <button className={c.uploadButton}>Dodaj zdjęcie</button>
    </div>
  );
};

export default ProductContent;
