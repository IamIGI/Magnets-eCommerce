import { useNavigate } from 'react-router-dom';
import c from './ProductTile.module.scss';
import { NavigationLinks } from '../../views/Root';

interface ProductTileProps {
  title: string;
  price: number;
  imageSrc: string;
}

const ProductTile: React.FC<ProductTileProps> = ({
  title,
  price,
  imageSrc,
}) => {
  const navigate = useNavigate();
  // img: 275x325 size (wXh)
  return (
    <div
      className={c.wrapper}
      onClick={() => navigate(NavigationLinks.ProductItem)}
    >
      <div className={c.imageWrapper}>
        <img src={imageSrc} />
      </div>
      <div className={c.content}>
        <p>{title}</p>
        <p className={c.price}>{price} zł</p>
      </div>
    </div>
  );
};

export default ProductTile;
