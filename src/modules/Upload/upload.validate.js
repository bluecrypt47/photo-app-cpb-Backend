import Result from '../../helpers/result.helper';

function validateUpload(req, res, next) {
  try {
    const { path } = req.body;
    if (path === '') {
      return Result.error(res, { message: 'Vui lòng nhập đường dẫn của ảnh trước khi cập nhập ảnh đại diện!' });
    }
    next();
  } catch (error) {
    next(error);
  }
}

const uploadValidate = { validateUpload };
export default uploadValidate;
