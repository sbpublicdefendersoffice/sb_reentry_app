import { forwardRef, HTMLAttributes, ReactNode } from 'react'

interface CallToActionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  blueBg?: boolean
}

import styles from './CallToAction.module.css'

const CallToAction = forwardRef<HTMLDivElement, CallToActionProps>(
  function CTAFunc(props: CallToActionProps, ref) {
    const { blueBg, children, className, ...other } = props
    return (
      <div
        style={{
          backgroundColor: blueBg ? 'var(--light-blue)' : 'var(--light)',
        }}
        ref={ref}
        className={`${styles.CallToAction} ${className && className}`}
        {...other}
      >
        {children}
      </div>
    )
  },
)

export default CallToAction
