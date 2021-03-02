export const validatePhoneNumber = (num: string): boolean =>
  /^[0-9]{10}$/.test(num)

export const INVALID_NUMBER: string = 'Invalid Number'
