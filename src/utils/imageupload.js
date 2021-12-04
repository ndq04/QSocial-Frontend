export const checkimage = (file) => {
  let err = ''
  if (!file) err = 'Không tìm thấy tệp'
  if (file.size > 1024 * 1024 * 10) err = 'Dung lượng ảnh vượt quá 10 MB'
  if (
    file.type !== 'image/jpeg' &&
    file.type !== 'image/jpg' &&
    file.type !== 'image/png' &&
    file.type !== 'image/gif'
  ) {
    err = 'Định dạng ảnh không hỗ trợ'
  }
  return err
}
