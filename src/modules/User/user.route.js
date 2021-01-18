import { Router } from 'express';
import userController from './user.controller';
import UserValidate from './user.validate';
const UserRouter = Router();

UserRouter.route('/me').get(userController.getMe).post(UserValidate.validateUpdateInfor, userController.updateInfo);
UserRouter.route('/me/password').post(UserValidate.validateUploadPassword, userController.updatePassword);
UserRouter.route('/me/avatar').post(UserValidate.validateUpdateAvatar, userController.updateAvatar);
export default UserRouter;
