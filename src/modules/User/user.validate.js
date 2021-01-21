import Result from '../../helpers/result.helper';

function checkEmail(email) {
  const filter = /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/;
  if (!filter.test(email)) {
    return false;
  }
  return true;
}

function UpdateValidate() {
  try {
    const { fullname, email, bio } = req.body;

    if (fullname === '' || email === '' || bio === '') {
      return Result.error(res, { message: 'Không được để trống!' });
    }
    if (fullname.length < 2 || fullname.length > 30) {
      return Result.error(res, { message: 'Họ tên có độ dài từ 2-30 ký tự!' });
    }
    if (email.length < 6 || email.length > 35) {
      return Result.error(res, { message: 'Họ tên phải có độ dài từ 2-35 ký tự!' });
    }
    if (checkEmail(email) === false) {
      return Result.error(res, { message: 'Vui lòng nhập email đúng định dạng: abc@gmail.com' });
    }
    if (bio.length < 2 || bio.length > 50) {
      return Result.error(res, { message: 'Bio phải có độ dài từ 2-50 ký tự!' });
    }
    next();
  } catch (error) {
    next();
  }
}

function ChangePasswordValidate() {
  const { currentPassword, newPassword, retypeNewPassword } = req.body;

  if (currentPassword === '' || newPassword === '' || retypeNewPassword === '') {
    return Result.error(res, { message: 'Không được để trống!' });
  }
  if (currentPassword.length < 6 || currentPassword.length > 30) {
    return Result.error(res, { message: 'Password phải có độ dài từ 6-30 ký tự!' });
  }
  if (newPassword.length < 6 || newPassword.length > 30) {
    return Result.error(res, { message: 'Password mới phải có độ dài từ 6-30 ký tự!' });
  }
  if (retypeNewPassword !== newPassword) {
    return Result.error(res, { message: 'Xác nhận mật khẩu không đúng với mật khẩu!' });
  }
}

function UpdateAvatarValidate() {
  const { profilePictureUrl } = req.body;
  if (profilePictureUrl === '') {
    return Result.error(res, { message: 'Vui lòng nhập đường dẫn!' });
  }
}

const UserValidate = { UpdateValidate, ChangePasswordValidate, UpdateAvatarValidate };
export default UserValidate;
