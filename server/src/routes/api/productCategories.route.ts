import { Router } from 'express';
import productCategoriesController from '../../controllers/productCategories.controller';

const productCategoriesRoutes = Router();

productCategoriesRoutes.route('/').get(productCategoriesController.getAll);
productCategoriesRoutes.route('/').post(productCategoriesController.add);
productCategoriesRoutes.route('/:id').put(productCategoriesController.editById);
productCategoriesRoutes
  .route('/:id')
  .delete(productCategoriesController.removeById);

export default productCategoriesRoutes;
