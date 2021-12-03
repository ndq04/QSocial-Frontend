const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export const valid = ({
  firstname,
  lastname,
  username,
  email,
  password,
  cfPassword,
}) => {
  const err = {}

  if (!firstname) {
    err.firstname = 'Họ không được để trống'
  } else if (firstname.length > 10) {
    err.firstname = 'Họ vượt quá 10 ký tự'
  }

  if (!lastname) {
    err.lastname = 'Tên không được để trống'
  } else if (lastname.length > 10) {
    err.lastname = 'Tên vượt quá 10 ký tự'
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
  }

  if (cfPassword !== password) {
    err.cfPassword = 'Mật khẩu nhập lại không khớp'
  }

  return {
    errMessage: err,
    errLength: Object.keys(err).length,
  }
}
