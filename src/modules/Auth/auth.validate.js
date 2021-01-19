import Result from '../../helpers/result.helper';

function checkEmail() {
  var email = document.getElementById('email');
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!filter.test(email.value)) {
    alert('Hãy nhập đúng đinh dạng: abc@gmail.com');
    email.focus;
    return false;
  }
}

function validateFormRegister(req, res, next) {
  try {
    const { fullname, email, password, retypePassword } = req.body;
    if ((fullname === '' || email === '', password === '', retypePassword === '')) {
      return Result.error(res, { message: 'Không được để trống' });
    }
    if (2 <= fullname.length <= 30) {
      return Result.error(res, { message: 'Họ tên phải có độ dài 2-30 ký tự!' });
    }
    if (6 <= email.length <= 35) {
      return Result.error(res, { message: 'Email phải có độ dài từ 6-35 ký tự!' });
    }
    if (6 <= password.length <= 30) {
      return Result.error(res, { message: 'Mật khẩu phải là chuỗi có độ dài từ 6-30 ký tự!' });
    }
    checkEmail();
    next();
  } catch (error) {
    next(error);
  }
}

function validateFromLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    if ((email === '' || password === '' || email === '', password === '')) {
      return Result.error(res, { message: 'Vui lòng nhập đầy đủ tài khoản, mật khẩu và được để trống!' });
    }
    if (6 <= email.length <= 35) {
      return Result.error(res, { message: 'Email phải từ 6-35 ký tự!' });
    }
    if (6 <= password.length <= 30) {
      return Result.error(res, { message: 'Mật khẩu phải là chuỗi có độ dài từ 6-30 ký tự!' });
    }
    checkEmail();
    next();
  } catch (error) {
    next(error);
  }
}

const Authvalidate = { validateFormRegister, validateFromLogin, checkEmail };
export default Authvalidate;
