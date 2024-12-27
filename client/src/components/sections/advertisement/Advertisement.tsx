import HorizontalLine from '../../ui/horizontalLine/HorizontalLine';
import c from './Advertisement.module.scss';

const Advertisement = () => {
  return (
    <div className={c.mainAdvertisement}>
      <div className={c.advertisementDescriptionWrapper}>
        <div className={c.advertisementDescription}>
          <div className={c.topParagraph}>
            <HorizontalLine />
            <h2> Założ konto </h2>
          </div>
          <h1>Zyskaj 10% zniżki</h1>
          <div className={c.bottomParagraph}>
            <h2 style={{ cursor: 'pointer' }}>Zarejestruj się</h2>
            <HorizontalLine />
          </div>
        </div>
      </div>
      <div className={c.advertisementImage}>
        <img
          className={c.bigScreen}
          src="advertisement/discount.jpg"
          alt="advert"
        />
        <img
          className={c.smallScreen}
          src="advertisement/discount_smallScreen.JPG"
          alt="advert"
        />
      </div>
    </div>
  );
};

export default Advertisement;
