import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();
router.post('/', userController.register);
router.post('/login', userController.login);
router.get('/token/verify', userController.verifyToken);
router.patch('/:id', userController.patchUser);

export default router;
