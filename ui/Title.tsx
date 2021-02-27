import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { Color } from '../types/ui'

import styles from './Title.module.css'

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  color?: Color
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
      style={{ color: color ? `var(--${color})` : 'auto' }}
      {...other}
    >
      {children}
    </h1>
  )
})

export default Title
