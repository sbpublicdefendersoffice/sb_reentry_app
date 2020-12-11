import { ReactNode } from 'react'
import NextLink from 'next/link'

import styles from './IconTile.module.css'

interface IconTileProps {
  children: ReactNode
  label: string
  path: string
  href: string
}

const IconTile = ({ children, label, path, href }: IconTileProps) => (
  <div className={styles.IconTile}>
    <NextLink href={href}>
      <a className={`${styles.Link} not-text-link`}>
        <img className={styles.Icon} src={path} alt={label} />
        <span>{children}</span>
      </a>
    </NextLink>
  </div>
)

export default IconTile
