import {
  BasketItemUpdateData,
  BasketItemUpdateDataPriceAndSizesArrayInner,
  BasketUpdateData,
} from '../api/magnetsServer/generated';
import validateRequestUtil from '../utils/validateRequest.utils';
import basketsService from '../services/baskets.service';
import catchErrors from '../utils/catchErrors.utils';

const REQUIRED_KEYS: Array<keyof BasketUpdateData> = [
  'products',
  'totalPrice',
  'totalQuantity',
];
const REQUIRED_KEYS_BASKET_ITEM: Array<keyof BasketItemUpdateData> = [
  'priceAndSizesArray',
  'productId',
  'totalPrice',
];

const REQUIRED_KEYS_PRICE_AND_SIZES_ARRAY: Array<
  keyof BasketItemUpdateDataPriceAndSizesArrayInner
> = ['itemId', 'quantity', 'totalPrice'];

const getByUserId = catchErrors(async (req, res) => {
  const { id } = req.params;
  console.log('ID: ', id);
  validateRequestUtil.validateId(id, 'userId');

  const basket = await basketsService.getByUserId(id);

  res.status(200).json(basket);
});

const create = catchErrors(async (req, res) => {
  const payload = req.body as { userId: string };

  validateRequestUtil.validateId(payload.userId!, 'UserId');

  const newBasket = await basketsService.create(payload.userId);

  res.status(201).json(newBasket);
});

const updateByUserId = catchErrors(async (req, res) => {
  const { id } = req.params; //userId
  const payload = req.body as BasketUpdateData;

  validateRequestUtil.validateId(id, 'UserId');
  validateRequestUtil.isValidPayload<BasketUpdateData>(payload, REQUIRED_KEYS);
  payload.products?.forEach((product) => {
    validateRequestUtil.isValidPayload(
      product,
      REQUIRED_KEYS_BASKET_ITEM,
      'Product'
    );
    if (product.priceAndSizesArray) {
      product.priceAndSizesArray?.forEach((ps) =>
        validateRequestUtil.isValidPayload(
          ps,
          REQUIRED_KEYS_PRICE_AND_SIZES_ARRAY,
          'Price and Size item'
        )
      );
    }
  });

  const updatedBasket = await basketsService.updateByUserId(id, payload);

  res.status(200).json(updatedBasket);
});

const removeByUserId = catchErrors(async (req, res) => {
  const { id } = req.params;

  validateRequestUtil.validateId(id, 'UserId');

  await basketsService.removeByUserId(id);

  res.status(200).send({ id });
});

export default {
  getByUserId,
  create,
  updateByUserId,
  removeByUserId,
};
