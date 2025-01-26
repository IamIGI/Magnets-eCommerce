import { NextFunction, Request, Response } from 'express';
import productsService from '../services/products.service';
import { ProductUpdateData } from '../api/magnetsServer/generated';
import validateRequestUtil from '../utils/validateRequest.utils';

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

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productsService.getAll();
    res.status(200).json(products);
  } catch (err: any) {
    next(err);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    validateRequestUtil.validateId(id);

    const product = await productsService.getById(id);

    res.status(200).json(product);
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
  } catch (err: any) {
    next(err);
  }
};

const editById = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
  } catch (err: any) {
    next(err);
  }
};

const removeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    validateRequestUtil.validateId(id);

    await productsService.removeById(id);
    res.status(200).send({ id });
  } catch (err: any) {
    next(err);
  }
};

export default {
  getAll,
  getById,
  editById,
  add,
  removeById,
};
