import { FormEvent, useState } from 'react'
import { Button, Input } from '../ui'

import {
  validatePhoneNumber,
  INVALID_NUMBER,
  POST,
  googleCustomClick,
} from '../helpers/'
import useLanguage from '../hooks/useLanguage'
import { isProd } from '../constants/env'
import { CopyHolder } from '../types/language'

export interface SendTextProps {
  org_name: string
  fullAddress: string
  cityStateZip: string
  id: string
}

export const copy: CopyHolder = {
  english: {
    error: 'Phone Number is 10 digits, numbers only',
    placeholder: ' Phone Number',
    location: 'Send Location Information',
  },
  spanish: {
    error: 'El número de teléfono tiene 10 dígitos, solo números',
    placeholder: ' Número de Teléfono',
    location: 'Enviar información de ubicación',
  },
}

export const delayTimeInMs: number = 3000

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
      /* istanbul ignore next */ else
        isProd && googleCustomClick({ used_twilio: true })
    } catch (error) {
      if (error.message === INVALID_NUMBER) setInputErrorMsg(activeCopy.error)
      else setInputErrorMsg(error.message)
      setTimeout(() => setInputErrorMsg(null), delayTimeInMs)
    }
  }

  const textId: string = `${org_name}${id}`

  return (
    <form role="form" className={styles.SendText} onSubmit={postText}>
      <label className={styles.Label} htmlFor={textId}>
        Send Text
      </label>
      <Input
        role="textbox"
        value={numberToSendTo}
        className={styles.Input}
        id={textId}
        onChange={e => setNumberToSendTo(e.target.value)}
        placeholder={activeCopy.placeholder}
      />
      <Button role="button" type="submit">
        {inputErrorMsg || activeCopy.location}
      </Button>
    </form>
  )
}

export default SendText
