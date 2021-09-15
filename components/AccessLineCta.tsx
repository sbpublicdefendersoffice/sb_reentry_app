import { useRouter } from 'next/router'

import { Button, Title, Paragraph, CallToAction } from '../ui'
import useLanguage from '../hooks/useLanguage'
import { CopyHolder } from '../types/language'

import styles from './AccessLineCta.module.css'

export const url: string = '/orgs/[id]'
export const as: string = '/orgs/recncoC6502aH2qYs'

export const accessLineInfo = {
  displayNumber: '(888) 868-1649',
  href: 'tel:8888681649',
}

export const copy: CopyHolder = {
  english: {
    agency: 'Behavioral Wellness',
    title: '24 Hour Crisis Response and Service Access Line',
    instruction:
      'Behavioral Wellness is the hub for mental health services in Santa Barbara County',
    buttonText: 'Learn more about Behavioral Wellness',
    call: 'Call Behavioral Wellness Access Line',
  },
  spanish: {
    agency: 'Bienestar conductual',
    title:
      'Línea de Acceso para Servicios y Crisis, Gratuito y Disponible las 24 Horas del Día',
    instruction:
      'El bienestar conductual es el centro de los servicios de salud mental en el condado de Santa Bárbara',
    buttonText: 'Más información sobre el bienestar conductual',
    call: 'Llame a la línea de acceso para el bienestar conductual',
  },
}
const AccessLineCta = () => {
  const { push } = useRouter()
  const { language } = useLanguage()
  const activeCopy = copy[language]

  return (
    <CallToAction blueBg>
      <Title role="heading">{activeCopy.agency}</Title>
      <Title role="heading">{activeCopy.title}</Title>
      <div className={styles.CopyAndLinks}>
        <Paragraph role="article" className={styles.Instruction}>
          {activeCopy.instruction}
        </Paragraph>
        <a role="link" href={accessLineInfo.href}>
          {activeCopy.call}
          <p role="link_paragraph">{accessLineInfo.displayNumber}</p>
        </a>
      </div>
      <Button role="button" onClick={() => push(url, as)}>
        {activeCopy.buttonText}
      </Button>
    </CallToAction>
  )
}

export default AccessLineCta
