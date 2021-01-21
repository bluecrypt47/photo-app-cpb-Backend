import { Router } from 'express';
import checkToken from '../../middlewares/token.middleware';
import userController from './user.controller';
import UserValidate from './user.validate';
const UserRouter = Router();

UserRouter.route('/:userId')
  .get(userController.getUser)
  .put(UserValidate.UpdateValidate, checkToken, userController.updateInfo)
  .delete(checkToken, userController.deleteUser);
UserRouter.route('/:userId/change-password').put(
  UserValidate.ChangePasswordValidate,
  checkToken,
  userController.updatePassword
);
UserRouter.route('/:userId/change-avatar').put(
  UserValidate.UpdateAvatarValidate,
  checkToken,
  userController.updateAvatar
);
UserRouter.route('/:userId/photos').get(userController.getPhotoOfUser);

export default UserRouter;
