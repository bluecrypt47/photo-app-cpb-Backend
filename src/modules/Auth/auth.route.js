import express from 'express';
import authController from './auth.controller';
import Authvalidate from './auth.validate';
const AuthRouter = express.Router();

AuthRouter.route('/login').post(Authvalidate.validateFromLogin, authController.login);
AuthRouter.route('/register').post(Authvalidate.validateFormRegister, authController.register);

export default AuthRouter;
