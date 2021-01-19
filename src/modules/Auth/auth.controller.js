import bcrypt from 'bcrypt';
import Result from '../../helpers/result.helper';
import { createAccessToken } from '../../helpers/token.helper';
import User from '../User/user.model';

const getMe = async (req, res, next) => {
  try {
    Result.success(res, { currentUser: req.user }, 201);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {// kiểm tra account có tồn tại trong DB ko
    const { email, password } = req.body; // lấy Account mà người dùng nhập 
    const user = await User.findOne({ email }); // tìm kiếm cái account này trong DB thấy là nó bug ra luôn thực chất là lấy token để checkc
    if (!user) { // nếu nhập email ko đúng
      return Result.error(res, { message: 'email does not exist' }, 401);
    }// nó sẽ băm pass ra và so sánh cái pass này trong DB
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return Result.error(res, { message: 'Wrong password' }, 401);
    }// tạo ra 1 cái token và lưu vào access_token
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
    // tạo 1 cái token cho newUser
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

const authController = { login, register, getMe };
export default authController;
