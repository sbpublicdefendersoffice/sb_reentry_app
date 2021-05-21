import { ReactNode } from 'react'

interface LetUsHelpHeadingProps {
  children: ReactNode
}

import styles from './LetUsHelpHeading.module.css'

const LetUsHelpHeading = ({ children }: LetUsHelpHeadingProps) => {
  return <div className={styles.LetUsHelpHeading}>{children}</div>
}

export default LetUsHelpHeading
