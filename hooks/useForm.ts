import useToast from './useToast'
import useLanguage from './useLanguage'
import { POST } from '../helpers/'
import { CopyHolder } from '../types'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
export const copy: CopyHolder = {
  english: {
    successMessage: `Your account was successfully created`,
    failMessage: 'Account already exists',
  },
  spanish: {
    successMessage: 'Su cuenta fue creada con éxito',
    failMessage: 'Your account was successfully created',
  },
}
const useForm = ({ initState, callback, validator }) => {
  const [stateValue, setStateValue] = useState(initState)
  const [errors, setErrors] = useState({})
  const { push } = useRouter()
  const { setToast } = useToast()
  const { language } = useLanguage()
  const [isSubmited, setIsSubmited] = useState(false)
  const { successMessage, failMessage } = copy[language]
  useEffect(() => {
    const isValidErrors = () =>
      Object.values(errors).filter(error => typeof error !== 'undefined')
        .length > 0
    if (isSubmited && !isValidErrors()) callback()
  }, [errors])
  const handleChange = e => {
    const { name, value, type } = e.target
    if (type === 'checkbox')
      setStateValue(val => ({ ...val, [name]: !Boolean(val[name]) }))
    else {
      if (name === 'signupType' && value === 'cbo')
        setStateValue(() => ({
          ...stateValue,
          commByEmail: false,
          commByText: false,
          commByPhone: false,
          [name]: value,
        }))
      else
        setStateValue(() => ({
          ...stateValue,
          [name]: value,
        }))
    }
  }
  const handleBlur = e => {
    const { name: fieldName } = e.target
    const faildFiels = validator(stateValue, fieldName)
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0],
    }))
  }
  const handleSubmit = async e => {
    e.preventDefault()
    const { name: fieldName } = e.target
    const faildFiels = validator(stateValue, fieldName)
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0],
    }))
    setIsSubmited(true)
    if (stateValue) {
      const signupCBO: Response = await fetch('/api/postSignup', {
        method: POST,
        body: JSON.stringify(stateValue),
      })
      const apiResponse = await signupCBO.json()
      if (apiResponse.error) {
        setToast(failMessage)
        return
      } else {
        setToast(successMessage)
        stateValue.org = ''
        stateValue.email = ''
        stateValue.pwd = ''
        stateValue.confirmPwd = ''
      }
      push('/verifyemail')
    }
  }
  return {
    handleChange,
    handleSubmit,
    handleBlur,
    stateValue,
    errors,
  }
}
export default useForm
