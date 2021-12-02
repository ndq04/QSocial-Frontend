const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export const valid = ({
  fullname,
  username,
  email,
  password,
  cfPassword,
  gender,
}) => {
  const err = {}

  if (!fullname) {
    err.fullname = 'Họ và tên không được để trống'
  } else if (fullname.length > 25) {
    err.fullname = 'Họ và tên vượt quá 25 ký tự'
  }

  if (!username) {
    err.username = 'Tên đăng nhập không được để trống'
  } else if (username.replace(/ /g, '').length > 15) {
    err.username = 'Tên đăng nhập vượt quá 15 ký tự'
  }

  if (!email) {
    err.email = 'Email không được để trống'
  } else if (!validateEmail(email)) {
    err.email = 'Định dạng email không hợp lệ'
  }

  if (!password) {
    err.password = 'Mật khẩu không được để trống'
  } else if (password.length < 6) {
    err.password = 'Mật khẩu tối thiểu 6 ký tự'
  }

  if (cfPassword !== password) {
    err.cfPassword = 'Mật khẩu nhập lại không khớp'
  }

  return {
    errMessage: err,
    errLength: Object.keys(err).length,
  }
}
