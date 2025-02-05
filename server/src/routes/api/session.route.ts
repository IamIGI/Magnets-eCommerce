import { Router } from 'express';
import sessionController from '../../controllers/auth/session.controller';

const sessionRoutes = Router();

sessionRoutes.get('/', sessionController.getSessions);
sessionRoutes.delete('/:id', sessionController.deleteSession);

export default sessionRoutes;
