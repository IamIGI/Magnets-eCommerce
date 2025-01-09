import express from 'express';
import productCategoriesController from '../../controllers/productCategories.controller';

const router = express.Router();

router.route('/').get(productCategoriesController.getAllProductCategories);
router.route('/').post(productCategoriesController.addNewProductCategory);
router.route('/:id').put(productCategoriesController.editProductCategory);
router
  .route('/:id')
  .delete(productCategoriesController.deleteProductCategoryById);

export = router;
