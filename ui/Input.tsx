import { forwardRef, InputHTMLAttributes } from 'react'

import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  block?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(function InputFunc(
  props: InputProps,
  ref,
) {
  const { block, className, ...other } = props

  return (
    <input
      ref={ref}
      className={`${styles.Input} ${className && `${className}`}`}
      style={{ display: block ? 'block' : 'initial' }}
      {...other}
    />
  )
})

export default Input
