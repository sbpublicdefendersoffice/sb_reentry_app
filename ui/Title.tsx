import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { color } from '../types/ui'

import styles from './Title.module.css'

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  color?: color
  children: ReactNode
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(function TitleFunc(
  props: TitleProps,
  ref,
) {
  const { color, children, className, ...other } = props

  return (
    <h1
      ref={ref}
      className={`${styles.Title} ${className && `${className}`}`}
      style={{ color: color ? `var(--${color})` : 'initial' }}
      {...other}
    >
      {children}
    </h1>
  )
})

export default Title
