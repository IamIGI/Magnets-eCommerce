import productsService from '../services/products.service';
import { ProductUpdateData } from '../api/magnetsServer/generated';
import validateRequestUtil from '../utils/validateRequest.utils';
import catchErrors from '../utils/catchErrors.utils';

export interface ProductPayload
  extends Omit<ProductUpdateData, 'createDate' | 'editDate'> {}
const REQUIRED_KEYS: Array<keyof ProductPayload> = [
  'name',
  'categoryId',
  'description',
  'imgNames',
  'isUserImageRequired',
  'isRemoved',
  'pricesAndSizesIds',
];

const getAll = catchErrors(async (req, res) => {
  const products = await productsService.getAll();
  res.status(200).json(products);
});

const getById = catchErrors(async (req, res) => {
  const { id } = req.params;

  validateRequestUtil.validateId(id);
  const product = await productsService.getById(id);

  res.status(200).json(product);
});

const add = catchErrors(async (req, res) => {
  const payload = req.body as ProductPayload;

  validateRequestUtil.isValidPayload(payload, REQUIRED_KEYS);
  validateRequestUtil.isValidArraySize(
    'imgNames',
    payload.imgNames,
    1,
    4,
    true
  );

  const newProduct = await productsService.add(payload);

  res.status(201).json(newProduct);
});

const editById = catchErrors(async (req, res) => {
  const { id } = req.params;
  const payload = req.body as ProductPayload;

  validateRequestUtil.validateId(id);
  validateRequestUtil.isValidPayload(payload, REQUIRED_KEYS);
  validateRequestUtil.isValidArraySize(
    'imgNames',
    payload.imgNames,
    1,
    4,
    true
  );

  const updatedProduct = await productsService.editById(id, payload);
  if (!updatedProduct) {
    res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(updatedProduct);
});

const removeById = catchErrors(async (req, res) => {
  const { id } = req.params;

  validateRequestUtil.validateId(id);
  await productsService.removeById(id);

  res.status(200).send({ id });
});

export default {
  getAll,
  getById,
  editById,
  add,
  removeById,
};
