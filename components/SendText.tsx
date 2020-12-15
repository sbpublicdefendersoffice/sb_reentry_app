import { FormEvent, useState } from 'react'
import { Button, Input } from '../ui'

interface SendTextProps {
  org_name: string
  fullAddress: string
  cityStateZip: string
}

const SendText = ({ org_name, fullAddress, cityStateZip }: SendTextProps) => {
  const [numberToSendTo, setNumberToSendTo] = useState<string | null>(null)
  const [inputErrorMsg, setInputErrorMsg] = useState<string | null>(null)

  const textToSend: string = `${org_name || ''} ${fullAddress}, ${cityStateZip}`

  const postText = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      const validPhoneNumber: RegExp = /^[0-9]{10}$/
      if (!validPhoneNumber.test(numberToSendTo))
        throw new Error('Phone Number is 10 digits, numbers only')

      const messageToSend = { to: numberToSendTo, message: textToSend }
      const text = await fetch('/api/QWYJrliMYbKZ9B5wt7EJm1*yD*H%5E66uQ%5E', {
        method: 'POST',
        headers: {
          Authorization: process.env.NEXT_PUBLIC_SECRET_TEXT_KEY,
        },
        body: JSON.stringify(messageToSend),
      })

      const textResponse = await text.json()
      if (textResponse.errorCode) throw new Error('Error with Message')
      console.log(textResponse)
    } catch (error) {
      console.error(error)
      setInputErrorMsg(error.message)
      setTimeout(() => setInputErrorMsg(null), 3000)
    }
  }

  return (
    <form onSubmit={postText}>
      <Input onChange={e => setNumberToSendTo(e.target.value)} />
      <Button type="submit">{inputErrorMsg || 'Send Location Info'}</Button>
    </form>
  )
}

export default SendText
