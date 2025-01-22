import { Request, Response } from 'express';
import {
  BasketItemUpdateData,
  BasketItemUpdateDataPriceAndSizesArrayInner,
  BasketUpdateData,
} from '../api/magnetsServer/generated';
import validateRequestUtil from '../utils/validateRequest.util';
import basketsService from '../services/baskets.service';

const REQUIRED_KEYS: Array<keyof BasketUpdateData> = [
  'basket',
  'totalPrice',
  'totalQuantity',
  'userId',
];
const REQUIRED_KEYS_BASKET_ITEM: Array<keyof BasketItemUpdateData> = [
  'priceAndSizesArray',
  'productId',
  'totalPrice',
];

const REQUIRED_KEYS_PRICE_AND_SIZES_ARRAY: Array<
  keyof BasketItemUpdateDataPriceAndSizesArrayInner
> = ['itemId', 'quantity', 'totalPrice'];

const getByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const basket = await basketsService.getByUserId(id);
    res.status(200).json(basket);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const add = async (req: Request, res: Response) => {
  try {
    const payload = req.body as BasketUpdateData;

    //Valid payloads
    validateRequestUtil.isValidPayload<BasketUpdateData>(
      payload,
      REQUIRED_KEYS
    );
    payload.basket?.forEach((basketItem) => {
      validateRequestUtil.isValidPayload(
        basketItem,
        REQUIRED_KEYS_BASKET_ITEM,
        'Basket item'
      );
      if (basketItem.priceAndSizesArray) {
        basketItem.priceAndSizesArray?.forEach((ps) =>
          validateRequestUtil.isValidPayload(
            ps,
            REQUIRED_KEYS_PRICE_AND_SIZES_ARRAY,
            'Price and Size item'
          )
        );
      }
    });
    validateRequestUtil.validateId(payload.userId!, 'UserId');

    const newBasket = await basketsService.add(payload);
    res.status(201).json(newBasket);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const updateByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; //userId
    const payload = req.body as BasketUpdateData;

    validateRequestUtil.validateId(id);
    //Valid payloads
    validateRequestUtil.isValidPayload<BasketUpdateData>(
      payload,
      REQUIRED_KEYS
    );
    payload.basket?.forEach((basketItem) => {
      validateRequestUtil.isValidPayload(
        basketItem,
        REQUIRED_KEYS_BASKET_ITEM,
        'Basket item'
      );
      if (basketItem.priceAndSizesArray) {
        basketItem.priceAndSizesArray?.forEach((ps) =>
          validateRequestUtil.isValidPayload(
            ps,
            REQUIRED_KEYS_PRICE_AND_SIZES_ARRAY,
            'Price and Size item'
          )
        );
      }
    });
    validateRequestUtil.validateId(payload.userId!, 'UserId');

    const updatedBasket = await basketsService.updateByUserId(id, payload);
    if (!updatedBasket) {
      res.status(404).json({ message: 'Basket not found' });
    }
    res.status(200).json(updatedBasket);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const removeByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    validateRequestUtil.validateId(id);

    await basketsService.removeByUserId(id);
    res.status(200).send({ id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getByUserId,
  add,
  updateByUserId,
  removeByUserId,
};
