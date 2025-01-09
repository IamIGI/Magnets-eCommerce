import express from 'express';
import pricesAndSizesController from '../../controllers/pricesAndSizes.controller';

const router = express.Router();

router.route('/').get(pricesAndSizesController.getAll);
router.route('/').post(pricesAndSizesController.add);
router.route('/:id').put(pricesAndSizesController.editById);
router.route('/:id').delete(pricesAndSizesController.removeById);

export = router;
