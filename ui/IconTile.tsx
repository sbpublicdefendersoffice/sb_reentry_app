import { ReactNode } from 'react'

import styles from './IconTile.module.css'

interface IconTileProps {
  children: ReactNode
  label: string
  path: string
  href: string
}

const IconTile = ({ children, label, path, href }: IconTileProps) => (
  <div className={styles.IconTile}>
    <a className={styles.Link} href={href}>
      <img className={styles.Icon} src={path} alt={label} />
      <span>{children}</span>
    </a>
  </div>
)

export default IconTile
