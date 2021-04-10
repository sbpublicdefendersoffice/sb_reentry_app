import NextLink from 'next/link'
import { ReactElement, Fragment } from 'react'

import { staticPageRoutes } from '../constants/routes'
import { RouteInfo } from '../types/routes'
import useLanguage from '../hooks/useLanguage'
import SBPDLogo from './SBPDLogo'
import { FreshStartLeaf, Paragraph } from '../ui'

import styles from './Footer.module.css'

const currentYear: number = new Date().getFullYear()
export const copyright: string = `© Copyright 2021${
  currentYear === 2021 ? '' : `-${currentYear}`
}`
export const linkInfo = {
  text: "Santa Barbara County Public Defender's Office",
  href: 'https://www.countyofsb.org/defender',
}

const Footer = () => {
  const { language } = useLanguage()

  const StaticPages: ReactElement[] = staticPageRoutes.map(
    (routeData: RouteInfo, i: number) => {
      const title = routeData[`title_${language}`]
      const { route } = routeData

      return (
        <Fragment key={i}>
          <NextLink href={route} as={route}>
            <Paragraph role="link" className={styles.Link}>
              {title}
            </Paragraph>
          </NextLink>
        </Fragment>
      )
    },
  )

  return (
    <footer role="region" className={styles.Footer}>
      <div className={styles.container}>
        <nav role="navigation" className={styles.Nav}>
          {StaticPages}
        </nav>
        <div className={styles.Logo2}>
          <SBPDLogo />
        </div>
        <div className={styles.Logo1}>
          <FreshStartLeaf className={styles.leaf} />
        </div>
      </div>
      <em>
        <span role="contentinfo" className={styles.copyright}>
          {copyright}
        </span>
        <a
          role="link"
          className={styles.copyright}
          href={linkInfo.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkInfo.text}
        </a>
      </em>
    </footer>
  )
}

export default Footer
