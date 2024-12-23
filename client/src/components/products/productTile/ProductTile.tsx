import classes from './ProductTile.module.scss';

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
  // img: 275x325 size (wXh)
  return (
    <div className={classes.wrapper}>
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
