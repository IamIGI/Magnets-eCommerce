import express from 'express';
import productsController from '../../controllers/products.controller';

const router = express.Router();

router.route('/').get(productsController.getAll);
router.route('/').post(productsController.add);
router.route('/:id').get(productsController.getById);
router.route('/:id').put(productsController.editById);
router.route('/:id').delete(productsController.removeById);

export = router;
