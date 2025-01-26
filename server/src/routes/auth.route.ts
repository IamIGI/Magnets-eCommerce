import { Router } from 'express';
import { register } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', register);

export default authRoutes;
