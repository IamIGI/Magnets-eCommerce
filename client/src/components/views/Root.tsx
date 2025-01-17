import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/home/Home';
import ProductItem from '../../pages/productItem/ProductItem';

export enum NavigationLinks {
  Home = '/',
  ProductItem = '/productItem/:id',
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
