import { useRouter } from 'next/router'

import { Button, Title, Paragraph, CallToAction } from '../ui'
import useLanguage from '../hooks/useLanguage'
import { CopyHolder } from '../types/language'

const copy: CopyHolder = {
  english: {
    title: 'Probation Report and Resource Center (PRRC)',
    instruction:
      'The PRRC is an excellent source for information on probation requirements, reporting and many other topics',
    buttonText: 'More information on Santa Barbara probation',
    callSb: 'Call Santa Barbara PRRC',
    callSm: 'Call Santa Maria PRRC',
  },
  spanish: {
    title: 'Centro de recursos e informes de libertad condicional (PRRC)',
    instruction:
      'El PRRC es una excelente fuente de información sobre los requisitos de libertad condicional, informes y muchos otros temas',
    buttonText:
      'Más información sobre la libertad condicional en Santa Bárbara',
    callSb: 'Llame al PRRC de Santa Bárbara',
    callSm: 'Llame al PRRC de Santa Maria',
  },
}

import styles from './PRRCcta.module.css'

const PRRCcta = () => {
  const { push } = useRouter()
  const { language } = useLanguage()
  const activeCopy = copy[language]

  return (
    <CallToAction blueBg>
      <Title>{activeCopy.title}</Title>
      <div className={styles.CopyAndLinkHolder}>
        <Paragraph>{activeCopy.instruction}</Paragraph>
        <nav className={styles.Links}>
          <a className={styles.Link} href={'tel:8056924890'}>
            {activeCopy.callSb}
            <p>(805) 692-4890</p>
          </a>
          <a className={styles.Link} href={'tel:8053467620'}>
            {activeCopy.callSm}
            <p>(805) 346-7620</p>
          </a>
        </nav>
      </div>
      <Button onClick={() => push('/search/[id]', '/search/rec5sVCDDkpXlclv0')}>
        {activeCopy.buttonText}
      </Button>
    </CallToAction>
  )
}

export default PRRCcta
