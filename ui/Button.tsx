import { ReactNode } from 'react'

import styles from './Button.module.css'

interface ButtonProps {
  children: ReactNode
  onClickFunc: (...args: any) => any
  block?: boolean
}

const Button = ({ children, onClickFunc, block }: ButtonProps) => (
  <button
    style={{ display: block ? 'block' : 'initial' }}
    className={styles.Button}
    onClick={onClickFunc}
  >
    <span className={styles.ButtonText}>{children}</span>
  </button>
)

export default Button
