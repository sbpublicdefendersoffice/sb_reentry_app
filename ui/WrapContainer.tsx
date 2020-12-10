import { ReactNode, forwardRef, HTMLAttributes } from 'react'

import styles from './WrapContainer.module.css'

interface WrapContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  width?: string
}

const WrapContainer = forwardRef<HTMLDivElement, WrapContainerProps>(
  function Container(props: WrapContainerProps, ref) {
    const { children, width, ...other } = props

    return (
      <section className={styles.WrapContainer}>
        <div
          ref={ref}
          style={{
            width: width || '100%',
          }}
          className={styles.Elements}
          {...other}
        >
          {children}
        </div>
      </section>
    )
  },
)

// const WrapContainer = ({ children, width }: WrapContainerProps) => (
//   <section className={styles.WrapContainer}>
//     <div style={{ width: width || '100%' }} className={styles.Elements}>
//       {children}
//     </div>
//   </section>
// )

export default WrapContainer
