import { useNavigate } from 'react-router-dom';
import c from './ProductTile.module.scss';
import { NavigationLinks } from '../../views/Root';
import { useAppDispatch } from '../../../state/store';
import { productSliceActions } from '../../../state/features/products/product.slice';

interface ProductTileProps {
  title: string;
  imageSrc: string;
  id: string;
}

const ProductTile: React.FC<ProductTileProps> = ({ title, imageSrc, id }) => {
  const navigate = useNavigate();
  const distpach = useAppDispatch();
  // img: 275x325 size (wXh)
  return (
    <div
      className={c.wrapper}
      onClick={() => {
        distpach(productSliceActions.setSelectedProduct(id));
        navigate(NavigationLinks.ProductItem.replace(':id', id));
      }}
    >
      <div className={c.imageWrapper}>
        <img src={imageSrc} />
      </div>
      <div className={c.content}>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default ProductTile;
