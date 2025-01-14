import express from 'express';
import productCategoriesController from '../../controllers/productCategories.controller';

const router = express.Router();

router.route('/').get(productCategoriesController.getAll);
router.route('/').post(productCategoriesController.add);
router.route('/:id').put(productCategoriesController.editById);
router.route('/:id').delete(productCategoriesController.removeById);

export = router;
