import { productsList } from '../../../mocks/productsList';
import SectionTitle from '../../sections/sectionTitle/SectionTitle';
import ProductTile from '../productTile/ProductTile';
import c from './ProductsList.module.scss';

const ProductsList = () => {
  return (
    <div className={c.wrapper}>
      <SectionTitle
        title="Produkty"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the."
      />

      <div className={c.productListWrapper}>
        {productsList.map((product) => (
          <ProductTile
            title={product.name}
            imageSrc={product.imgSrc}
            price={product.price}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
