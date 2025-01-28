import productCategoriesService from '../services/productCategories.service';
import { ProductCategory } from '../api/magnetsServer/generated';
import validateRequestUtil from '../utils/validateRequest.utils';
import catchErrors from '../utils/catchErrors.utils';

export type ProductCategoryPayload = Omit<ProductCategory, '_id'>;
const REQUIRED_KEYS: Array<keyof ProductCategoryPayload> = [
  'categoryName',
  'description',
];

const getAll = catchErrors(async (req, res) => {
  const productCategories = await productCategoriesService.getAll();
  res.status(200).json(productCategories);
});

const add = catchErrors(async (req, res) => {
  const payload = req.body as ProductCategoryPayload;

  validateRequestUtil.isValidPayload<ProductCategoryPayload>(
    payload,
    REQUIRED_KEYS
  );

  const newCategory = await productCategoriesService.add(payload);
  res.status(201).json(newCategory);
});

const editById = catchErrors(async (req, res) => {
  const { id } = req.params;
  const payload = req.body as ProductCategoryPayload;

  validateRequestUtil.validateId(id);
  validateRequestUtil.isValidPayload<ProductCategoryPayload>(
    payload,
    REQUIRED_KEYS
  );

  const updatedCategory = await productCategoriesService.editById(id, payload);

  res.status(200).json(updatedCategory);
});

const removeById = catchErrors(async (req, res) => {
  const { id } = req.params;

  validateRequestUtil.validateId(id);
  await productCategoriesService.removeById(id);
  res.status(200).send({ id });
});

export default {
  getAll,
  add,
  editById,
  removeById,
};
