import { Request, Response } from 'express';
import productsService from '../services/products.service';
import { ProductPayload } from '../api/magnetsServer/generated';
import validateRequestUtil from '../utils/validateRequest.util';

const getAll = async (req: Request, res: Response) => {
  try {
    const products = await productsService.getAll();
    res.status(200).json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);

    validateRequestUtil.validateId(id);

    res.status(200).json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const add = async (req: Request, res: Response) => {
  try {
    const productData = req.body as ProductPayload;
    const newProduct = await productsService.add(productData);
    res.status(201).json(newProduct);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const editById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body as ProductPayload;

    validateRequestUtil.validateId(id);

    const updatedProduct = await productsService.editById(id, updateData);
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const removeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    validateRequestUtil.validateId(id);

    await productsService.removeById(id);
    res.status(200).send({ id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getAll,
  getById,
  editById,
  add,
  removeById,
};
