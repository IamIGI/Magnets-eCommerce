import { Request, Response } from 'express';
import productsService from '../services/products.service';
import { Product } from '../api/magnetsServer/generated';

/**
 * Controller to fetch all products.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Controller to fetch a single product by ID.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Controller to create a new product.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
const addNewProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body as Product;
    const newProduct = await productsService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Controller to update a product by ID.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
const updateProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedProduct = await productsService.updateProduct(id, updateData);
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Controller to delete a product by ID.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await productsService.deleteProduct(id);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  addNewProduct,
  deleteProductById,
  updateProductById,
  getProductById,
  getAllProducts,
};
