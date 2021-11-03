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
  const [state, setState] = useState(initState)
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
    const { name, value } = e.target
    setState(() => ({
      ...state,
      [name]: value,
    }))
  }
  const handleBlur = e => {
    const { name: fieldName } = e.target
    const faildFiels = validator(state, fieldName)
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0],
    }))
  }
  const handleSubmit = async e => {
    e.preventDefault()
    const { name: fieldName } = e.target
    const faildFiels = validator(state, fieldName)
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0],
    }))
    setIsSubmited(true)
    if (state) {
      const postCBOToPostgres: Response = await fetch('/api/postCBO', {
        method: POST,
        body: JSON.stringify(state),
      })
      const apiResponse = await postCBOToPostgres.json()
      if (apiResponse.error) {
        setToast(failMessage)
        return
      } else {
        setToast(successMessage)
        state.org = ''
        state.email = ''
        state.pwd = ''
        state.confirmPwd = ''
      }
      push('/verifyemail')
    }
  }
  return {
    handleChange,
    handleSubmit,
    handleBlur,
    state,
    errors,
  }
}
export default useForm
