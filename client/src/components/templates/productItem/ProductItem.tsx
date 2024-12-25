import c from './ProductItem.module.scss';
import ProductImageGallery from '../../products/productImageGallery/productImageGallery';

const ProductItem = () => {
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
      <div className={c.productContentWrapper}></div>
    </div>
  );
};

export default ProductItem;
