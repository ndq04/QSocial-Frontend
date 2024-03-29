export const checkimage = (file) => {
  let err = ''
  if (!file) err = 'Không tìm thấy tệp'
  if (file.size > 1024 * 1024 * 6) err = 'Dung lượng ảnh vượt quá 6 MB'
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

export const imageupload = async (images) => {
  let imageArr = []
  for (const image of images) {
    const formData = new FormData()
    formData.append('file', image)

    formData.append('upload_preset', 'ndq_qsocial')
    formData.append('cloud_name', 'quangnd')

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/quangnd/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await res.json()
      imageArr.push({public_id: data.public_id, secure_url: data.secure_url})
    } catch (error) {
      console.log(error)
    }
  }
  return imageArr
}
