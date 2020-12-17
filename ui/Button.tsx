import { ReactNode, forwardRef, ButtonHTMLAttributes } from 'react'

import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  block?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function ButtonFunc(
  props: ButtonProps,
  ref,
) {
  const { children, block, ...other } = props

  return (
    <button
      ref={ref}
      style={{ display: block ? 'block' : 'initial' }}
      className={styles.Button}
      role="button"
      {...other}
    >
      <span className={styles.ButtonText}>{children}</span>
    </button>
  )
})

export default Button
