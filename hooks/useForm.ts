import { useToast } from '../hooks'
import { POST } from '../helpers/'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
const useForm = ({ initState, callback, validator }) => {
  const [state, setState] = useState(initState)
  const [errors, setErrors] = useState({})
  const { push } = useRouter()
  const { setToast } = useToast()
  const [isSubmited, setIsSubmited] = useState(false)
  const getCookie = async (): Promise<void> => {
    await fetch('/api/jwt', { credentials: 'include' })
  }
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
      const postUserToPostgres: Response = await fetch('/api/postUser', {
        method: POST,
        body: JSON.stringify(state),
      })
      const apiResponse = await postUserToPostgres.json()
      if (apiResponse.error) {
        setToast(`there was an error: ${apiResponse.error}`)
        return
      } else {
        getCookie()
        setToast('Your account was successfully created')
        state.org = ''
        state.email = ''
        state.pwd = ''
        state.confirmPwd = ''
      }
      push('/verifyemail')
    }
  }
  const handleForgotPasswordSubmit = async e => {
    e.preventDefault()
    const { name: fieldName } = e.target
    const faildFiels = validator(state, fieldName)
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0],
    }))
    setIsSubmited(true)
    console.log('🥳', state)
    if (state) {
      const postUserToPostgres: Response = await fetch(
        '/api/postForgotPassword',
        {
          method: POST,
          body: state.email,
        },
      )
      const apiResponse = await postUserToPostgres.json()
      if (apiResponse.error) {
        setToast(`there was an error: ${apiResponse.error}`)
        return
      } else {
        setToast('Your email was sent')
        state.email = ''
      }
    }
  }
  return {
    handleChange,
    handleSubmit,
    handleBlur,
    handleForgotPasswordSubmit,
    state,
    errors,
  }
}
export default useForm
