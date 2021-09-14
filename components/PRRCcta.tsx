import { useRouter } from 'next/router'

import { Button, Title, Paragraph, CallToAction } from '../ui'
import useLanguage from '../hooks/useLanguage'
import { CopyHolder } from '../types/language'

export const copy: CopyHolder = {
  english: {
    title: 'Probation Report and Resource Center (PRRC)',
    instruction:
      'The PRRC is an excellent source for information on probation requirements, reporting and many other topics',
    callSb: 'Call Santa Barbara PRRC',
    callSm: 'Call Santa Maria PRRC',
    buttonText: 'More information on Santa Barbara probation',
  },
  spanish: {
    title: 'Centro de recursos e informes de libertad condicional (PRRC)',
    instruction:
      'El PRRC es una excelente fuente de información sobre los requisitos de libertad condicional, informes y muchos otros temas',
    callSb: 'Llame al PRRC de Santa Bárbara',
    callSm: 'Llame al PRRC de Santa Maria',
    buttonText:
      'Más información sobre la libertad condicional en Santa Bárbara',
  },
}

export const accessLineInfo = {
  santaBarbara: {
    displayNumber: '(805) 692-4890',
    href: 'tel:8056924890',
  },
  santaMaria: {
    displayNumber: '(805) 346-7620',
    href: 'tel:8053467620',
  },
}

export const url: string = '/orgs/[id]'
export const as: string = '/orgs/rec5sVCDDkpXlclv0'

import styles from './PRRCcta.module.css'

const PRRCcta = () => {
  const { push } = useRouter()
  const { language } = useLanguage()
  const activeCopy = copy[language]

  const { santaBarbara, santaMaria } = accessLineInfo

  return (
    <CallToAction>
      <Title>{activeCopy.title}</Title>
      <div className={styles.CopyAndLinkHolder}>
        <Paragraph>{activeCopy.instruction}</Paragraph>
        <nav className={styles.Links}>
          <a className={styles.Link} href={santaBarbara.href}>
            <span>{activeCopy.callSb}</span>
            <p role="link_paragraph">{santaBarbara.displayNumber}</p>
          </a>
          <a className={styles.Link} href={santaMaria.href}>
            <span>{activeCopy.callSm}</span>
            <p role="link_paragraph">{santaMaria.displayNumber}</p>
          </a>
        </nav>
      </div>
      <Button role="button" onClick={() => push(url, as)}>
        {activeCopy.buttonText}
      </Button>
    </CallToAction>
  )
}

export default PRRCcta
