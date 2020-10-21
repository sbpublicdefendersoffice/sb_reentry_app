import { ReactNode } from 'react'

import styles from './WrapContainer.module.css'

interface WrapContainerProps {
  children: ReactNode
  width?: string
}

const WrapContainer = ({ children, width }: WrapContainerProps) => (
  <section className={styles.WrapContainer}>
    <div style={{ width: width || '100%' }} className={styles.Elements}>
      {children}
    </div>
  </section>
)

export default WrapContainer
