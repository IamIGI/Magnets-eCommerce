import express from 'express';
import basketController from '../../controllers/basket.controller';

const router = express.Router();

router.route('/').post(basketController.create);
router.route('/:id').get(basketController.getByUserId);
router.route('/:id').put(basketController.updateByUserId);
router.route('/:id').delete(basketController.removeByUserId);

export = router;
