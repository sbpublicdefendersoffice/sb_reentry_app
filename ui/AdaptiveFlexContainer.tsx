import { ReactNode, forwardRef, HTMLAttributes } from 'react'

import styles from './AdaptiveFlexContainer.module.css'

interface AdaptiveFlexContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const AdaptiveFlexContainer = forwardRef<
  HTMLDivElement,
  AdaptiveFlexContainerProps
>(function FlexContainerFunc(props: AdaptiveFlexContainerProps, ref) {
  const { children, className, ...other } = props

  return (
    <div
      role="main"
      ref={ref}
      className={`${styles.AdaptiveFlexContainer} ${className}`}
      {...other}
    >
      {children}
    </div>
  )
})

export default AdaptiveFlexContainer
