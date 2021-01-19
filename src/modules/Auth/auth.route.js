import express from 'express';
import checkToken from '../../middlewares/token.middleware';
import authController from './auth.controller';
import Authvalidate from './auth.validate';
const AuthRouter = express.Router();

AuthRouter.route('/my-profile').get(checkToken, authController.getMe);
AuthRouter.route('/login').post(Authvalidate.validateFromLogin, authController.login);
AuthRouter.route('/register').post(Authvalidate.validateFormRegister, authController.register);

export default AuthRouter;
