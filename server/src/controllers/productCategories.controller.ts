import { Request, Response } from 'express';
import productCategoriesService from '../services/productCategories.service';
import { ProductCategory } from '../api/magnetsServer/generated';
import validateRequestUtil from '../utils/validateRequest.util';

const getAllProductCategories = async (req: Request, res: Response) => {
  try {
    console.log('getAllProductCategories');
    const productCategories =
      await productCategoriesService.getAllProductCategories();
    res.status(200).json(productCategories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const addNewProductCategory = async (req: Request, res: Response) => {
  try {
    const categoryData = req.body as Omit<ProductCategory, 'id'>;
    const newCategory = await productCategoriesService.addProductCategory(
      categoryData
    );
    res.status(201).json(newCategory);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const editProductCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body as Omit<ProductCategory, 'id'>;

    validateRequestUtil.validateId(id);

    const updatedCategory = await productCategoriesService.editProductCategory(
      id,
      updatedData
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
const deleteProductCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    validateRequestUtil.validateId(id);

    await productCategoriesService.deleteProductCategory(id);
    res.status(200).send({ id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getAllProductCategories,
  addNewProductCategory,
  editProductCategory,
  deleteProductCategoryById,
};
