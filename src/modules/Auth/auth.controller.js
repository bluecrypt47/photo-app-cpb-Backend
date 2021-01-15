import bcrypt from 'bcrypt';
import Result from '../../helpers/result.helper';
import { createAccessToken } from '../../helpers/token.helper';
import User from '../User/user.model';

const login = async (req, res, next) => {
  try {// kiểm tra account có tồn tại trong DB ko
    const { email, password } = req.body; // lấy Account mà người dùng nhập 
    const user = await User.findOne({ email }); // tìm kiếm cái account này trong DB
    if (!user) { // nếu nhập email ko đúng
      return Result.error(res, { message: 'email does not exist' }, 401);
    }// nó sẽ băm pass ra và so sánh cái pass này trong DB
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return Result.error(res, { message: 'Wrong password' }, 401);
    }// nếu account đúng thì sẽ cho user vào trang chủ
    const access_token = createAccessToken(user);
    const currentUser = {
      fullname: user.fullname,
      email: user.email,
      profilePictureUrl: user.profilePictureUrl,
    };
    Result.success(res, { access_token, currentUser }, 201);
  } catch (error) {
    return next(error);
  }
};

const register = async (req, res, next) => {
  try {// ckech xem có email này tồn tại trong DB chưa
    const { fullname, email, password } = req.body;
    const checkEmail = await User.find({ email }).countDocuments();
    if (checkEmail) {
      return Result.error(res, { message: 'Email này đã được sử dụng' });
    }
    const saltRounds = 10; // băm pass ra thành 1 cái chuỗi và lưu thông tin vào DB
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      profilePictureUrl: `https://avatars.dicebear.com/4.5/api/initials/${fullname}.svg`,
    });
    // đưa user đến trang chủ
    const access_token = createAccessToken(newUser);
    const currentUser = {
      fullname: newUser.fullname,
      email: newUser.email,
      profilePictureUrl: newUser.profilePictureUrl,
    };
    Result.success(res, { access_token, currentUser }, 201);
  } catch (error) {
    return next(error);
  }
};

const authController = { login, register };
export default authController;
