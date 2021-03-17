import { FormEvent, useState } from 'react'
import { Button, Input } from '../ui'

import {
  validatePhoneNumber,
  INVALID_NUMBER,
  POST,
} from '../helpers/validators'
import useLanguage from '../hooks/useLanguage'
import { CopyHolder } from '../types/language'

interface SendTextProps {
  org_name: string
  fullAddress: string
  cityStateZip: string
  id: string
}

const copy: CopyHolder = {
  english: {
    error: 'Phone Number is 10 digits, numbers only',
    placeholder: 'Phone Number',
    location: 'Send Location Information',
  },
  spanish: {
    error: 'El número de teléfono tiene 10 dígitos, solo números',
    placeholder: 'Número de Teléfono',
    location: 'Enviar información de ubicación',
  },
}

import styles from './SendText.module.css'

const SendText = ({
  org_name,
  fullAddress,
  cityStateZip,
  id,
}: SendTextProps) => {
  const { language } = useLanguage()
  const activeCopy = copy[language]

  const [numberToSendTo, setNumberToSendTo] = useState<string | null>(null)
  const [inputErrorMsg, setInputErrorMsg] = useState<string | null>(null)

  const textToSend: string = `${org_name || ''} ${fullAddress}, ${cityStateZip}`

  const postText = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      const validPhoneNumber = validatePhoneNumber(numberToSendTo)
      if (!validPhoneNumber) throw new Error(INVALID_NUMBER)

      const messageToSend = { to: numberToSendTo, message: textToSend }
      const text = await fetch('/api/twilio', {
        method: POST,
        body: JSON.stringify(messageToSend),
      })

      const textResponse = await text.json()
      if (textResponse.error) throw new Error(textResponse.error)
    } catch (error) {
      if (error.message === INVALID_NUMBER) setInputErrorMsg(activeCopy.error)
      else setInputErrorMsg(error.message)
      setTimeout(() => setInputErrorMsg(null), 3000)
    }
  }

  const textId: string = `${org_name}${id}`

  return (
    <form onSubmit={postText}>
      <label className={styles.Label} htmlFor={textId}>
        Send Text
      </label>
      <Input
        id={textId}
        onChange={e => setNumberToSendTo(e.target.value)}
        placeholder={activeCopy.placeholder}
      />
      <Button type="submit">{inputErrorMsg || activeCopy.location}</Button>
    </form>
  )
}

export default SendText
