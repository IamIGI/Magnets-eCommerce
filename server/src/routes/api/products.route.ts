import { Router } from 'express';
import productsController from '../../controllers/products.controller';

const productRoutes = Router();

productRoutes.route('/').get(productsController.getAll);
productRoutes.route('/').post(productsController.add);
productRoutes.route('/:id').get(productsController.getById);
productRoutes.route('/:id').put(productsController.editById);
productRoutes.route('/:id').delete(productsController.removeById);

export default productRoutes;
