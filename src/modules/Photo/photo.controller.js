import Result from '../../helpers/result.helper';
import Photo from '../Photo/photo.model';

// Show tất cả hình trong DB ra cùng id và profile của hình mà ko cần đăng nhập cũng đc
const getAll = async (req, res, next) => {
  try {
    const photos = await Photo.find({})
      .populate({
        path: 'userId',
        select: '_id profilePictureUrl fullname',
      })
      .sort({ _id: -1 });
    return Result.success(res, { photos });
  } catch (error) {
    next(error);
  }
};
// Khi người dùng muốn xem hình của mình 
const getAllOfCurrentUser = async (req, res, next) => {
  try { // trước khi lấy từ DB ra thì nó sẽ check token của người dùng có trong DB ko
    const photos = await Photo.find({ userId: req.user.id })
      .populate({
        path: 'userId',
        select: '_id profilePictureUrl fullname',
      })
      .sort({ _id: -1 });
    return Result.success(res, { photos });
  } catch (error) {
    next(error);
  }
};
// lấy hình theo id
const getById = async (req, res, next) => {
  try {
    const { photoId } = req.params;
    const photo = await Photo.findById(photoId).populate({
      path: 'userId',
      select: '_id profilePictureUrl fullname',
    });
    return Result.success(res, { photo });
  } catch (error) {
    return Result.error(res, { message: 'Not Found' }, 404);
  }
};
// thêm hình
const createPhoto = async (req, res, next) => {
  try {
    const { photoLabel, photoUrl } = req.body;
    const newPhoto = await Photo.create({
      photoLabel,
      photoUrl,
      userId: req.user.id,
    });
    delete req.user.password;
    newPhoto.userId = req.user;
    return Result.success(res, { newPhoto });
  } catch (error) {
    next(error);
  }
};
//cập nhật lại thông tin hình
const updatePhoto = async (req, res, next) => {
  try {
    const { photoLabel } = req.body;
    const { photoId } = req.params;
    await Photo.updateOne({ _id: photoId }, { $set: { photoLabel } });
    const photoUpdated = await Photo.findById(photoId).populate({
      path: 'userId',
      select: '_id profilePictureUrl fullname',
    });
    return Result.success(res, { photoUpdated });
  } catch (error) {
    next(error);
  }
};
// xóa hình
const deletePhoto = async (req, res, next) => {
  try {
    const { photoId } = req.params;
    const result = await Photo.findOneAndDelete({ userId: req.user._id, _id: photoId });
    if (result) {
      return Result.success(res, { message: 'Delete completed' });
    }
    return Result.error(res, { message: 'Delete invalid' });
  } catch (error) {
    next(error);
  }
};
const photoController = { getAll, getById, createPhoto, getAllOfCurrentUser, updatePhoto, deletePhoto };
export default photoController;
