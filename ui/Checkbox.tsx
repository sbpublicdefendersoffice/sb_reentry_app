import { forwardRef, InputHTMLAttributes } from 'react'

import styles from './Checkbox.module.css'

const Checkbox = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function CheckboxFunc(props: InputHTMLAttributes<HTMLInputElement>, ref) {
  const { className, ...other } = props

  return (
    <input
      type="checkbox"
      ref={ref}
      className={`${styles.Checkbox} ${className && className}`}
      {...other}
    />
  )
})

export default Checkbox
