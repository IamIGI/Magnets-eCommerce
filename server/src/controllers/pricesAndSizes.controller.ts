import { NextFunction, Request, Response } from 'express';
import { PriceAndSizes } from '../api/magnetsServer/generated';
import validateRequestUtil from '../utils/validateRequest.util';
import pricesAndSizesService from '../services/pricesAndSizes.service';

export type PricesAndSizesPayload = Omit<PriceAndSizes, '_id'>;
const REQUIRED_KEYS: Array<keyof PricesAndSizesPayload> = ['price', 'size'];

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await pricesAndSizesService.getAll();
    res.status(200).json(data);
  } catch (err: any) {
    next(err);
  }
};

const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body as Omit<PriceAndSizes, 'id'>;

    validateRequestUtil.isValidPayload(payload, REQUIRED_KEYS);

    const newData = await pricesAndSizesService.add(payload);
    res.status(201).json(newData);
  } catch (err: any) {
    next(err);
  }
};

const editById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const payload = req.body as Omit<PriceAndSizes, 'id'>;

    validateRequestUtil.validateId(id);
    validateRequestUtil.isValidPayload(payload, REQUIRED_KEYS);

    const updatedData = await pricesAndSizesService.editById(id, payload);
    if (!updatedData) {
      res.status(404).json({ message: 'Product category  not found' });
    }
    res.status(200).json(updatedData);
  } catch (err: any) {
    next(err);
  }
};

const removeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    validateRequestUtil.validateId(id);

    await pricesAndSizesService.removeById(id);
    res.status(200).send({ id });
  } catch (err: any) {
    next(err);
  }
};

export default {
  getAll,
  add,
  editById,
  removeById,
};
