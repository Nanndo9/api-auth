import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { LoginController } from '../controllers/LoginController';
import { GetProfileController } from '../controllers/GetProfileController';
import { authMiddleware } from '../middlewares/authMiddleware';

const routes = Router();

routes.post('/user', new UserController().create);
routes.post('/login', new LoginController().login);
routes.get('/profile', authMiddleware, new GetProfileController().getProfile);
export default routes;
