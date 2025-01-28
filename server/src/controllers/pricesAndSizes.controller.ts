import { PriceAndSizes } from '../api/magnetsServer/generated';
import validateRequestUtil from '../utils/validateRequest.utils';
import pricesAndSizesService from '../services/pricesAndSizes.service';
import catchErrors from '../utils/catchErrors.utils';

export type PricesAndSizesPayload = Omit<PriceAndSizes, '_id'>;
const REQUIRED_KEYS: Array<keyof PricesAndSizesPayload> = ['price', 'size'];

const getAll = catchErrors(async (req, res) => {
  const data = await pricesAndSizesService.getAll();
  res.status(200).json(data);
});

const add = catchErrors(async (req, res) => {
  const payload = req.body as Omit<PriceAndSizes, 'id'>;

  validateRequestUtil.isValidPayload(payload, REQUIRED_KEYS);
  const newData = await pricesAndSizesService.add(payload);

  res.status(201).json(newData);
});

const editById = catchErrors(async (req, res) => {
  const { id } = req.params;
  const payload = req.body as Omit<PriceAndSizes, 'id'>;

  validateRequestUtil.validateId(id);
  validateRequestUtil.isValidPayload(payload, REQUIRED_KEYS);
  const updatedData = await pricesAndSizesService.editById(id, payload);

  res.status(200).json(updatedData);
});

const removeById = catchErrors(async (req, res) => {
  const { id } = req.params;

  validateRequestUtil.validateId(id);
  await pricesAndSizesService.removeById(id);

  res.status(200).send({ id });
});

export default {
  getAll,
  add,
  editById,
  removeById,
};
