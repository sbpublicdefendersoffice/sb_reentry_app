import NextLink from 'next/link'

import { Button, Title, Paragraph } from '../../../ui'
import { FullPageDecision } from '../../../components'
import { CopyHolder } from '../../../types/language'
import useLanguage from '../../../hooks/useLanguage'

export const copy: CopyHolder = {
  english: {
    apply:
      "Got it! Before you can be eligible for diversion services, you need to apply with the Public Defender's office",
    submit: 'Click to submit an application',
    learn: 'To learn more about diversion services:',
    click: 'click here',
    disclaimer:
      'Please note that before you can receive services, you must submit an application and be approved',
  },
  spanish: {
    apply:
      '¡Entiendo! Antes de que pueda ser elegible para los servicios de desvío, debe presentar una solicitud en la oficina del Defensor Público',
    submit: 'Haga clic para enviar una solicitud',
    learn: 'Para obtener más información sobre los servicios de desvío:',
    click: 'haga clic aquí',
    disclaimer:
      'Tenga en cuenta que antes de poder recibir los servicios, debe enviar una solicitud y ser aprobado.',
  },
}

const route: string = '/letushelp/diversion'

const ApplyForDiversion = () => {
  const { language } = useLanguage()

  const { apply, submit, learn, click, disclaimer } = copy[language]

  return (
    <FullPageDecision>
      <Title>{apply}</Title>
      <a
        className="not-text-link"
        href={
          'https://www.countyofsb.org/uploadedFiles/defender/Content/Documents/Financial%20Declaration%20Modifications.pdf'
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>{submit}</Button>
      </a>
      <Paragraph size="med-text">
        {learn}{' '}
        <NextLink href={route} as={route}>
          <a>{click}</a>
        </NextLink>
      </Paragraph>
      <Paragraph size="med-text">{disclaimer}</Paragraph>
    </FullPageDecision>
  )
}

export default ApplyForDiversion
