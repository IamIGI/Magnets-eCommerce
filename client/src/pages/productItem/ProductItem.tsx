import ProductContent from '../../components/productItem/productContent/ProductContent';
import ProductImageGallery from '../../components/productItem/productImageGallery/ProductImageGallery';
import c from './ProductItem.module.scss';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { fetchProductById } from '../../state/features/products/product.slice';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { NavigationLinks } from '../../components/views/Root';
import Loading from '../../components/ui/loading/Loading';
import { FetchStatus } from '../../interfaces/global';
import { addToBasket } from '../../state/features/basket/basket.slice';

const ProductItem = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = useAppSelector((state) => state.products.selectedProduct);
  const fetchStatus = useAppSelector((state) => state.products.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) {
      navigate(NavigationLinks.Home);
      return;
    }
    if (!product) {
      dispatch(fetchProductById(id!));
    }
  }, [id, product]);

  if (fetchStatus === FetchStatus.Loading) {
    return <Loading />;
  }

  function addProduct(priceAndSizeId: string, quantity: number) {
    if (!product) throw new Error('No product found.');

    dispatch(addToBasket({ product, quantity, priceAndSizeId }));
  }

  if (!product) {
    return <h1>No product</h1>;
  }

  return (
    <div className={c.wrapper}>
      <div className={c.productImageWrapper}>
        <ProductImageGallery
          imgSrc={product?.imgNames.map((img) => `/products/${img}`)}
        />
      </div>
      <div className={c.productContentWrapper}>
        <ProductContent
          name={product.name}
          desc={product.description}
          priceAndSizes={product.pricesAndSizes}
          handleAddProduct={addProduct}
        />
      </div>
    </div>
  );
};

export default ProductItem;
