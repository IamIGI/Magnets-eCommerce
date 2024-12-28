import React from 'react';
import priceUtils from '../../../utils/price.utils';
import c from './Price.module.scss';

interface PriceProps {
  price: number;
  as?: keyof React.ReactHTML; // Allow any valid HTML tag
  showDesc?: boolean;
}

const Price: React.FC<PriceProps> = ({ price, as: Tag, showDesc = false }) => {
  const content = `${showDesc ? 'Cena: ' : ''}${priceUtils.displayPrice(
    price
  )} zł`;

  return Tag ? <Tag className={c.wrapper}>{content}</Tag> : content;
};

export default Price;
