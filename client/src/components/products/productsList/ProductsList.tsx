import { Product } from '../../../api/magnetsServer/generated';
import { FetchStatus } from '../../../interfaces/global';
import SectionTitle from '../../sections/sectionTitle/SectionTitle';
import Loading from '../../ui/loading/Loading';
import ProductTile from '../productTile/ProductTile';
import c from './ProductsList.module.scss';

interface ProductsListProps {
  products: Product[];
  fetchStatus: FetchStatus;
}
const ProductsList: React.FC<ProductsListProps> = ({
  products,
  fetchStatus,
}) => {
  return (
    <div className={c.wrapper}>
      {fetchStatus === FetchStatus.Loading ? (
        <Loading />
      ) : (
        <>
          <SectionTitle
            title="Produkty"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the."
          />

          <div className={c.productListWrapper}>
            {products
              .filter((p) => !p.isRemoved)
              .map((product) => (
                <ProductTile
                  id={product.id}
                  title={product.name}
                  imageSrc={`products/${product.imgNames[0]}`}
                  key={product.id}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsList;
