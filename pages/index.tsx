import { useState, useEffect, ReactElement, FC } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import {
  Header,
  Title,
  Menu,
  Link,
  NavDropDownButton,
} from '@trussworks/react-uswds'

import { PwaTags, PwaDownloadButton } from '../components'
import fixes from '../styles/fixer-classes.module.css'

const linkList: string[] = [
  'Food',
  'Medical Support',
  'Transportation',
  'Mental Health',
  'Social Services',
  'Clothing',
  'Resource Directory',
  'Legal Services',
  'Community Support Services',
  'Employment',
  'Long Term Housing',
  'Emergency Shelter',
  'Substance Use Treatment',
]

const PageLinks: ReactElement[] = linkList.map((label: string, i: number) => {
  const url = `/${label.replace(/\s/g, '').toLowerCase()}`

  return (
    <NextLink href={url} key={i}>
      <Link href={url}>{label}</Link>
    </NextLink>
  )
})

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

const Home: FC = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [
    downloadEvent,
    setDownloadEvent,
  ] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const handleDownloadEvent = e => {
      e.preventDefault()
      setDownloadEvent(e)
    }
    addEventListener('beforeinstallprompt', handleDownloadEvent)

    return () => removeEventListener('beforeinstallprompt', handleDownloadEvent)
  }, [])

  return (
    <>
      <PwaTags />
      <Head>
        <title>Santa Barbara Reentry</title>
      </Head>
      <main>
        <Header className="bg-primary height-card">
          <div className="grid-container-widescreen display-flex flex-align-center height-full">
            <Title className={`${fixes.marginFix} text-white font-serif-xl`}>
              Santa Barbara Reentry
            </Title>
            <img
              src="./images/logo192.png"
              alt="County of Santa Barbara Logo"
              height="100px"
              className="margin-left-3"
            />
          </div>
          <NavDropDownButton
            label="Links"
            menuId="links"
            isOpen={isMenuOpen}
            onToggle={(): void => setIsMenuOpen(!isMenuOpen)}
          />
          <Menu items={PageLinks} isOpen={isMenuOpen} />
        </Header>
        {downloadEvent && (
          <PwaDownloadButton PwaDownloadEvent={downloadEvent} />
        )}
      </main>
    </>
  )
}

export default Home
