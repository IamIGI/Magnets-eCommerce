import Advertisement from '../../advertisement/Advertisement';
import ProductsList from '../../products/productsList/ProductsList';
import SupportSection from '../../SupportSection/SupportSection';
import classes from './Home.module.scss';

const Home = () => {
  return (
    <div className={classes.wrapper}>
      <Advertisement />
      <ProductsList />
      <SupportSection />
    </div>
  );
};

export default Home;
