import Result from '../../helpers/result.helper';
import Authvalidate from '../auth/auth.validate';

function validateUpdateInfor(req, res, next) {
  try {
    const { fullname, email, bio } = req.body;
    if ((fullname == '', email === '', bio === '')) {
      return Result.error(res, { message: 'Vui lòng nhập ít nhất một thông tin để cập nhật!' });
    }
    if (2 <= fullname.length <= 30) {
      return Result.error(res, { message: 'Họ tên phải có độ dài 2-30 ký tự!' });
    }
    if (6 <= email.length <= 35) {
      return Result.error(res, { message: 'Email phải có độ dài từ 6-35 ký tự!' });
    }
    if (2 <= bio.length <= 50) {
      return Result.error(res, { message: 'Bio phải có độ dài từ 2-50 ký tự!' });
    }
    Authvalidate.checkEmail();
    next();
  } catch (error) {
    next(error);
  }
}

function validateUploadPassword(req, res, next) {
  try {
    const { currentPassword, newPassword, retypePassword } = req.body;
    if (currentPassword === '') {
      return Result.error(res, { message: 'Vui lòng không để trống mậu khẩu hiện tại trước khi đổi!' });
    }
    if (newPassword === '') {
      return Result.error(res, { message: 'Vui lòng không để trống mậu khẩu mới trước khi đổi!' });
    }
    if (retypePassword === '') {
      return Result.error(res, { message: 'Vui lòng không để trống nhập lại mậu khẩu mới trước khi đổi!' });
    }
    if ((currentPassword === '', newPassword === '', retypePassword)) {
      return Result.error(res, { message: 'Vui lòng nhập mật khẩu trước khi đổi!' });
    }
    if (2 <= currentPassword.length <= 30) {
      return Result.error(res, { message: 'Mật khẩu cũ phải có độ dài 2-30 ký tự!' });
    }
    if (2 <= newPassword.length <= 30) {
      return Result.error(res, { message: 'Mật khẩu mới phải có độ dài 2-50 ký tự!' });
    }
    if (newPassword === retypePassword) {
      return Result.error(res, { message: 'Vui lòng nhập đúng mật khẩu mới!' });
    }
    next();
  } catch (error) {
    next(error);
  }
}

function validateUpdateAvatar(req, res, next) {
  try {
    const { profilePictureUrl } = req.body;
    if (profilePictureUrl === '') {
      return Result.error(res, { message: 'Vui lòng nhập đường dẫn của ảnh trước khi cập nhập ảnh đại diện!' });
    }
    next();
  } catch (error) {
    next(error);
  }
}

const UserValidate = { validateUpdateInfor, validateUploadPassword, validateUpdateAvatar };
export default UserValidate;
