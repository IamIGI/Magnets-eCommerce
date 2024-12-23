import HorizontalLine from '../horizontalLine/HorizontalLine';
import classes from './Advertisement.module.scss';

const Advertisement = () => {
  return (
    <div className={classes.mainAdvertisement}>
      <div className={classes.advertisementDescriptionWrapper}>
        <div className={classes.advertisementDescription}>
          <div className={classes.topParagraph}>
            <HorizontalLine />
            <h2> Założ konto </h2>
          </div>
          <h1>Zyskaj 10% zniżki</h1>
          <div className={classes.bottomParagraph}>
            <h2 style={{ cursor: 'pointer' }}>Zarejestruj się</h2>
            <HorizontalLine />
          </div>
        </div>
      </div>
      <div className={classes.advertisementImage}>
        <img
          className={classes.bigScreen}
          src="advertisement/discount.jpg"
          alt="advert"
        />
        <img
          className={classes.smallScreen}
          src="advertisement/discount_smallScreen.JPG"
          alt="advert"
        />
      </div>
    </div>
  );
};

export default Advertisement;
