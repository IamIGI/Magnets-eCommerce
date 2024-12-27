import ProductsList from '../../products/productsList/ProductsList';
import Advertisement from '../../sections/advertisement/Advertisement';
import SupportSection from '../../sections/SupportSection/SupportSection';
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
