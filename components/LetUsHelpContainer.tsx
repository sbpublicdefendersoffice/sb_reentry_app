import { ReactNode } from 'react'

interface LetUsHelpContainerProps {
  children: ReactNode
}

import styles from './LetUsHelpContainer.module.css'

const LetUsHelpContainer = ({ children }: LetUsHelpContainerProps) => (
  <section role="region" className={styles.LetUsHelpContainer}>
    {children}
  </section>
)

export default LetUsHelpContainer
