export const validator = (values, fieldName) => {
  let errors = {}
  switch (fieldName) {
    case 'email':
      validateEmail(values.email, errors)
      break
    case 'pwd':
      validatePassword(values.pwd, errors)
      break
    case 'confirmPwd':
      validateConfirmPwd(values.confirmPwd, errors)
      break
    case 'org':
      validateOrg(values.org, errors)
      break
    default:
  }
  return errors
}

export const validateEmail = (email, errors) => {
  let result = true

  if (!email) {
    errors.email = 'Email is Required'
    result = false
  } else {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    result = re.test(String(email).toLowerCase())
    if (!result) errors.email = 'Invalid Email address'
  }
  return result
}
export const validateOrg = (org, errors) => {
  let result = true

  if (!org) {
    errors.org = 'Invalid Organization name'
    result = false
  } else {
    const re = /^[a-zA-Z0-9_.-]*$/
    result = re.test(String(org).toLowerCase())
    if (!result) errors.org = 'Invalid Organization name'
  }
  return result
}

export const validatePassword = (pwd, errors) => {
  let result = true
  let upper = /(?=.*[A-Z])/
  let checkUpper = upper.test(pwd)
  let num = /(?=.*[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-])/
  let checkNum = num.test(pwd)
  if (!pwd) {
    errors.pwd = 'Password is Required'
    result = false
  } else {
    var lower = /(?=.*[a-z])/
    result = lower.test(pwd)

    if (!result) {
      errors.pwd = 'Password must contain at least one lower case letter.'
      result = false
    } else if (!checkUpper) {
      errors.pwd = 'Password must contain at least one uppercase case letter.'
      result = false
    } else if (!checkNum) {
      errors.pwd = 'Password must contain at least one number.'
      result = false
    } else if (pwd.length < 8) {
      errors.pwd = 'Your password has less than 8 characters.'
      result = false
    }
  }

  return result
}
export const validateConfirmPwd = (confirmPwd, errors) => {
  let result = true
  let lower = /(?=.*[a-z])/
  let upper = /(?=.*[A-Z])/
  let num = /(?=.*[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-])/
  let checkNum = num.test(confirmPwd)
  let checkUpper = upper.test(confirmPwd)
  if (!confirmPwd) {
    errors.confirmPwd = 'Make sure confirm password match password'
    result = false
  } else {
    result = lower.test(confirmPwd)

    if (!result) {
      errors.confirmPwd =
        'Password must contain at least one lower case letter.'
      result = false
    } else if (!checkUpper) {
      errors.confirmPwd =
        'Password must contain at least one uppercase case letter.'
      result = false
    } else if (!checkNum) {
      errors.confirmPwd = 'Password must contain at least one number.'
      result = false
    } else if (confirmPwd.length < 8) {
      errors.confirmPwd = 'Your password has less than 8 characters.'
      result = false
    }
  }

  return result
}
