import express from 'express';
import productsController from '../../controllers/products.controller';

const router = express.Router();

router.route('/').get(productsController.getAllProducts);
router.route('/').post(productsController.addNewProduct);
router.route('/:id').put(productsController.updateProductById);
router.route('/:id').delete(productsController.deleteProductById);

export = router;
