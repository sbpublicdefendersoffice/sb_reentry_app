import { ReactNode, forwardRef, HTMLAttributes } from 'react'

import styles from './Card.module.css'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  interactive?: boolean
  border?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(function CardFunc(
  props: CardProps,
  ref,
) {
  let { border, children, interactive, className, ...other } = props
  if (border === undefined) border = true

  return (
    <div
      ref={ref}
      className={`${styles.Card} ${interactive && styles.active} ${
        className && className
      } ${border && styles.border}`}
      {...other}
    >
      {children}
    </div>
  )
})

export default Card
