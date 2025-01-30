import { Router } from 'express';
import authController from '../controllers/auth/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);
authRoutes.get('/refresh', authController.refresh);
authRoutes.get('/logout', authController.logout);
authRoutes.get('/email/verify/:code', authController.verifyEmail);

export default authRoutes;
