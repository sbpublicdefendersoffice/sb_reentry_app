import { ReactNode } from 'react'

import styles from './PublicPage.module.css'

interface PublicPageProps {
  children: ReactNode
}

const PublicPage = ({ children }: PublicPageProps) => (
  <main className={styles.PublicPage}>{children}</main>
)

export default PublicPage
