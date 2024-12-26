import { Route, Routes } from 'react-router-dom';
import Home from '../templates/home/Home';
import ProductItem from '../templates/productItem/ProductItem';

export enum NavigationLinks {
  Home = '/',
  ProductItem = '/productItem',
}

const Root = () => {
  return (
    <Routes>
      <Route path={NavigationLinks.Home} element={<Home />} />
      <Route path={NavigationLinks.ProductItem} element={<ProductItem />} />
    </Routes>
  );
};

export default Root;
