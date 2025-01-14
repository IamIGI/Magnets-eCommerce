import { Request, Response } from 'express';
import productCategoriesService from '../services/productCategories.service';
import { ProductCategory } from '../api/magnetsServer/generated';
import validateRequestUtil from '../utils/validateRequest.util';

export type ProductCategoryPayload = Omit<ProductCategory, '_id'>;
const REQUIRED_KEYS: Array<keyof ProductCategoryPayload> = [
  'categoryName',
  'description',
];

const getAll = async (req: Request, res: Response) => {
  try {
    const productCategories = await productCategoriesService.getAll();
    res.status(200).json(productCategories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const add = async (req: Request, res: Response) => {
  try {
    const payload = req.body as ProductCategoryPayload;

    validateRequestUtil.isValidPayload<ProductCategoryPayload>(
      payload,
      REQUIRED_KEYS
    );

    const newCategory = await productCategoriesService.add(payload);
    res.status(201).json(newCategory);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const editById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body as ProductCategoryPayload;

    validateRequestUtil.validateId(id);
    validateRequestUtil.isValidPayload<ProductCategoryPayload>(
      payload,
      REQUIRED_KEYS
    );

    const updatedCategory = await productCategoriesService.editById(
      id,
      payload
    );
    if (!updatedCategory) {
      res.status(404).json({ message: 'Product category  not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Controller to delete a product by ID.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
const removeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    validateRequestUtil.validateId(id);

    await productCategoriesService.removeById(id);
    res.status(200).send({ id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getAll,
  add,
  editById,
  removeById,
};
