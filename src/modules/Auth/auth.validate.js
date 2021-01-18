import Result from '../../helpers/result.helper';

function validateFormRegister(req, res, next) {
  try {
    const { fullname, email, password } = req.body;
    if ((fullname === '' || email === '', password === '')) {
      return Result.error(res, { message: 'Không được để trống' });
    }
    next();
  } catch (error) {
    next(error);
  }
}

function validateFromLogin(req, res, next){
  try{
    const{ email, password} = req.body;
    if((email === '' || password === '' || email === '', password ==='')){
      return Result.error(res, {message: 'Vui lòng nhập đầy đủ tài khoản, mật khẩu và được để trống!'});
    }
    next();
  }catch(error){
    next(error);
  }
}

const Authvalidate={validateFormRegister, validateFromLogin};
export default Authvalidate;
