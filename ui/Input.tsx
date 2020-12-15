import { forwardRef, InputHTMLAttributes } from 'react'

import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  block?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(function InputFunc(
  props: InputProps,
  ref,
) {
  const { block, ...other } = props

  return (
    <input
      ref={ref}
      className={styles.Input}
      style={{ display: block ? 'block' : 'initial' }}
      {...other}
    />
  )
})

export default Input
