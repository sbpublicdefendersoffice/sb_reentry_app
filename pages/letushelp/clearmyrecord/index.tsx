import Head from 'next/head'
import { useRouter } from 'next/router'

import { Button, Title, Paragraph } from '../../../ui'
import { siteTitle } from '../../../constants/'
import { FullPageDecision } from '../../../components'
import { CopyHolder } from '../../../types/'
import { useLanguage } from '../../../hooks/'

export const copy: CopyHolder = {
  english: {
    title: 'Clear My Record',
    leaving: `You are now leaving ${siteTitle}`,
    disclaimer: `Clear my Record is not associated with ${siteTitle} and we make no guarantees regarding their services.`,
    confirm: 'Do you still wish to visit Clear my Record?',
    no: 'No',
    yes: 'Yes',
  },
  spanish: {
    title: 'Limpiar mi registro',
    leaving: `Ahora te vas de ${siteTitle}`,
    disclaimer: `Clear my Record no está asociado con ${siteTitle} y no ofrecemos garantías con respecto a sus servicios.`,
    confirm: '¿Aún desea visitar Clear my Record?',
    no: 'No',
    yes: 'Si',
  },
}

const ClearMyRecordLanding = () => {
  const { back } = useRouter()
  const { language } = useLanguage()

  const { leaving, disclaimer, confirm, no, yes, title } = copy[language]

  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${title}`}</title>
      </Head>
      <FullPageDecision>
        <Title>{leaving}</Title>
        <Paragraph size="med-text">{disclaimer}</Paragraph>
        <Paragraph size="med-text">{confirm}</Paragraph>
        <div style={{ marginTop: 'var(--margin-lg)' }}>
          <Button data-testid="BackButton" light onClick={() => back()}>
            {no}
          </Button>
          <a
            className="not-text-link"
            href="https://www.clearmyrecord.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>{yes}</Button>
          </a>
        </div>
      </FullPageDecision>
    </>
  )
}

export default ClearMyRecordLanding
