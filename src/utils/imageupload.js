export const checkimage = (file) => {
  let err = ''
  if (!file) err = 'Không tìm thấy tệp'
  if (file.size > 1024 * 1024 * 10) err = 'Dung lượng ảnh vượt quá 10 MB'
  if (
    file.type !== 'image/jpeg' &&
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

    formData.append('upload_preset', 'fcfm2sej')
    formData.append('cloud_name', 'doltvro6d')

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/doltvro6d/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await res.json()
      // console.log(data)
      imageArr.push({public_id: data.public_id, secure_url: data.secure_url})
    } catch (error) {
      console.log(error)
    }
  }
  return imageArr
}
