import { useEffect } from 'react';
import ProductsList from '../../components/products/productsList/ProductsList';
import Advertisement from '../../components/sections/advertisement/Advertisement';
import SupportSection from '../../components/sections/SupportSection/SupportSection';
import c from './Home.module.scss';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { fetchProducts } from '../../state/features/products/product.slice';

const Home = () => {
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className={c.wrapper}>
      <Advertisement />

      <ProductsList
        fetchStatus={products.status}
        products={products.products}
      />
      <SupportSection />
    </div>
  );
};

export default Home;
