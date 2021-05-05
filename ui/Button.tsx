import { ReactNode, forwardRef, ButtonHTMLAttributes } from 'react'

import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  light?: boolean
  block?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function ButtonFunc(
  props: ButtonProps,
  ref,
) {
  const { className, children, block, light, style, ...other } = props

  return (
    <button
      ref={ref}
      style={{ ...style, display: block ? 'block' : 'initial' }}
      className={`${styles.Button} ${className} ${light ? styles.Light : ''}`}
      role="button"
      {...other}
    >
      <span className={styles.ButtonText}>{children}</span>
    </button>
  )
})

export default Button
