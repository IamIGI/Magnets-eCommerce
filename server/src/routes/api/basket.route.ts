import { Router } from 'express';
import basketController from '../../controllers/basket.controller';

const basketRoutes = Router();

basketRoutes.route('/').post(basketController.create);
basketRoutes.route('/:id').get(basketController.getByUserId);
basketRoutes.route('/:id').put(basketController.updateByUserId);
basketRoutes.route('/:id').delete(basketController.removeByUserId);

export default basketRoutes;
