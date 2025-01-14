import ProductContent from '../../components/productItem/productContent/ProductContent';
import ProductImageGallery from '../../components/productItem/productImageGallery/ProductImageGallery';
import c from './ProductItem.module.scss';
import { useAppDispatch, useAppSelector } from '../../state/store';
import {
  fetchProducts,
  productSliceActions,
} from '../../state/features/products/productsSlice';
import { useEffect } from 'react';

const ProductItem = () => {
  const count = useAppSelector((state) => state.products.counter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className={c.wrapper}>
      <div className={c.productImageWrapper}>
        <ProductImageGallery
          imgSrc={[
            'products/productItem_1.jpg',
            'products/productItem_2.jpg',
            'products/productItem_3.jpg',
          ]}
        />
      </div>
      <div className={c.productContentWrapper}>
        <ProductContent />
      </div>
      <h2>{count}</h2>
      <button onClick={() => dispatch(productSliceActions.inc())}>inc</button>
      <button onClick={() => dispatch(productSliceActions.dec())}>dec</button>
      <button onClick={() => dispatch(productSliceActions.incByAmount(10))}>
        incBy10
      </button>
    </div>
  );
};

export default ProductItem;
