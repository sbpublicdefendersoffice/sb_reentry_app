import NextLink from 'next/link'

import { Button, Title, Paragraph } from '../ui'
import FullPageDecision from './FullPageDecision'
import { CopyHolder } from '../types/language'
import useLanguage from '../hooks/useLanguage'

export const copy: CopyHolder = {
  english: {
    submit: 'Click to submit an application',
    click: 'click here',
    disclaimer:
      'Please note that before you can receive any services, you must submit an application and be approved',
  },
  spanish: {
    submit: 'Haga clic para enviar una solicitud',
    click: 'haga clic aquí',
    disclaimer:
      'Tenga en cuenta que antes de poder recibir cualquier servicio, debe enviar una solicitud y ser aprobado',
  },
}

interface ApplyForServiceProps {
  parentCopy: { [key: string]: string }
  route: string
}

const ApplyForService = ({ parentCopy, route }: ApplyForServiceProps) => {
  const { language } = useLanguage()
  const { submit, click, disclaimer } = copy[language]

  const { apply, learn } = parentCopy
  const finalRoute: string = `/letushelp/${route}`

  return (
    <FullPageDecision>
      <Title role="heading">{apply}</Title>
      <a
        className="not-text-link"
        href={
          'https://www.countyofsb.org/uploadedFiles/defender/Content/Documents/Financial%20Declaration%20Modifications.pdf'
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button role="button">{submit}</Button>
      </a>
      <Paragraph role="article" size="med-text">
        {learn}{' '}
        <NextLink href={finalRoute} as={finalRoute}>
          <a>{click}</a>
        </NextLink>
      </Paragraph>
      <Paragraph role="article" size="med-text">
        {disclaimer}
      </Paragraph>
    </FullPageDecision>
  )
}

export default ApplyForService
