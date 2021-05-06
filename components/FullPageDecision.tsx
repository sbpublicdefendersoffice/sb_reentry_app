import { ReactNode } from 'react'

interface FullPageDecisionProps {
  children: ReactNode
}

import styles from './FullPageDecision.module.css'

const FullPageDecision = ({ children }: FullPageDecisionProps) => (
  <section role="region" className={styles.FullPageDecision}>
    {children}
  </section>
)

export default FullPageDecision
