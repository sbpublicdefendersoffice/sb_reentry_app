import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { Color, TextSize } from '../types/ui'

import styles from './Paragraph.module.css'

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  color?: Color
  size?: TextSize
  children: ReactNode
}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  function ParagraphFunc(props: ParagraphProps, ref) {
    const { color, size, children, className, style, ...other } = props

    return (
      <p
        ref={ref}
        className={`${styles.Paragraph} ${className && `${className}`}`}
        style={{
          ...style,
          color: color ? `var(--${color})` : 'auto',
          fontSize: size ? `var(--${size})` : 'auto',
        }}
        {...other}
      >
        {children}
      </p>
    )
  },
)

export default Paragraph
