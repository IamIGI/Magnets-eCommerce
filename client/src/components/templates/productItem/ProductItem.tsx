import ProductContent from '../../productItem/productContent/ProductContent';
import ProductImageGallery from '../../productItem/productImageGallery/ProductImageGallery';
import c from './ProductItem.module.scss';

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
      <div className={c.productContentWrapper}>
        <ProductContent />
      </div>
    </div>
  );
};

export default ProductItem;
