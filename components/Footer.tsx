import NextLink from 'next/link'
import { ReactElement, Fragment } from 'react'

import { staticPageRoutes, RouteInfo } from '../constants/routes'
import useLanguage from '../hooks/useLanguage'
import SBPDLogo from './SBPDLogo'
import { FreshStartLeaf, Paragraph } from '../ui'

import styles from './Footer.module.css'

const currentYear: number = new Date().getFullYear()
const copyright: string = `© Copyright 2021${
  currentYear === 2021 ? '' : `-${currentYear}`
}`

const Footer = () => {
  const { language } = useLanguage()

  const StaticPages: ReactElement[] = staticPageRoutes.map(
    (routeData: RouteInfo, i: number) => {
      const title = routeData[`title_${language}`]
      const { route } = routeData

      return (
        <Fragment key={i}>
          <NextLink href={route} as={route}>
            <Paragraph className={styles.Link}>{title}</Paragraph>
          </NextLink>
        </Fragment>
      )
    },
  )

  return (
    <footer className={styles.Footer}>
      <div className={styles.container}>
        <nav className={styles.Nav}>{StaticPages}</nav>
        <div className={styles.Logo2}>
          <SBPDLogo />
        </div>
        <div className={styles.Logo1}>
          <FreshStartLeaf className={styles.leaf} />
        </div>
      </div>
      <em>
        <span className={styles.copyright}>{copyright}</span>{' '}
        <a
          className={styles.copyright}
          href="https://www.countyofsb.org/defender"
          target="_blank"
          rel="noopener noreferrer"
        >
          Santa Barbara County Public Defender's Office
        </a>
      </em>
    </footer>
  )
}

export default Footer
