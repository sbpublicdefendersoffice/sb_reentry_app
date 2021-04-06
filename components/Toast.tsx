import { useEffect } from 'react'

import { Card, Paragraph } from '../ui'
import useToast from '../hooks/useToast'

import styles from './Toast.module.css'

const delayTimeInMs: number = 7000

const Toast = () => {
  const { toast, setToast } = useToast()

  useEffect((): void => {
    if (toast) setTimeout(() => setToast(null), delayTimeInMs)
  }, [toast])

  return (
    toast && (
      <Card border={false} className={styles.Toast}>
        <Paragraph size="med-text" color="light-2">
          {toast}
        </Paragraph>
      </Card>
    )
  )
}

export default Toast
