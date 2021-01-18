import Result from '../../helpers/result.helper';


function validateUpdateInfor(req, res, next){
    try{
      const{fullname, email, bio} = req.body;
      if((fullname =='', email === '', bio === '' )){
        return Result.error(res, {message: 'Vui lòng nhập ít nhất một thông tin để cập nhật!'});
      }
      next();
    }catch(error){
      next(error);
    }
  }

  function validateUploadPassword(req, res, next){
      try{
        const{currentPassword, newPassword} = req.body;
        if((currentPassword === '')){
            return Result.error(res, {message: 'Vui lòng không để trống mậu khẩu hiện tại trước khi đổi!'});
        }
        else if( newPassword === '' ){
            return Result.error(res, {message: 'Vui lòng không để trống mậu khẩu mới trước khi đổi!'});
        }
        else if( currentPassword ==='', newPassword ===''){
            return Result.error(res, {message: 'Vui lòng nhập mật khẩu trước khi đổi!'});
        }
      next();
      }catch(error){
      next(error);
    }

    function validateUpdateAvatar(req, res, next){
        try{
            const{profilePictureUrl} = req.body;
            if(profilePictureUrl === ''){
                return Result.error(res, {message: 'Vui lòng nhập đường dẫn của ảnh trước khi cập nhập ảnh đại diện!'});
            }
            next();
        }catch(error){
            next(error);
        }
        
    }
  }

const UserValidate={validateUpdateInfor, validateUploadPassword, validateUpdateAvatar};
export default UserValidate;
  