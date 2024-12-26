import { useNavigate } from 'react-router-dom';
import classes from './ProductTile.module.scss';
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
      className={classes.wrapper}
      onClick={() => navigate(NavigationLinks.ProductItem)}
    >
      <div className={classes.imageWrapper}>
        <img src={imageSrc} />
      </div>
      <div className={classes.content}>
        <p>{title}</p>
        <p className={classes.price}>{price} zł</p>
      </div>
    </div>
  );
};

export default ProductTile;
