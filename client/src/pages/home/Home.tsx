import ProductsList from '../../components/products/productsList/ProductsList';
import Advertisement from '../../components/sections/advertisement/Advertisement';
import SupportSection from '../../components/sections/SupportSection/SupportSection';
import c from './Home.module.scss';

const Home = () => {
  return (
    <div className={c.wrapper}>
      <Advertisement />
      <ProductsList />
      <SupportSection />
    </div>
  );
};

export default Home;
