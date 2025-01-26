import { Router } from 'express';
import pricesAndSizesController from '../../controllers/pricesAndSizes.controller';

const priceAndSizesRoutes = Router();

priceAndSizesRoutes.route('/').get(pricesAndSizesController.getAll);
priceAndSizesRoutes.route('/').post(pricesAndSizesController.add);
priceAndSizesRoutes.route('/:id').put(pricesAndSizesController.editById);
priceAndSizesRoutes.route('/:id').delete(pricesAndSizesController.removeById);

export default priceAndSizesRoutes;
