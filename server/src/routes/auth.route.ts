import { Router } from 'express';
import authController from '../controllers/auth/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);
authRoutes.get('/logout', authController.logout);

export default authRoutes;
