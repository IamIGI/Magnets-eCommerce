import Advertisement from '../../advertisement/Advertisement';
import ProductsList from '../../products/productsList/ProductsList';
import classes from './Home.module.scss';

const Home = () => {
  return (
    <div className={classes.wrapper}>
      <Advertisement />
      <ProductsList />
    </div>
  );
};

export default Home;
