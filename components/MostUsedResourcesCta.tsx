import { useRouter } from 'next/router'

import useLanguage from '../hooks/useLanguage'
import { Button, CallToAction, Title, Paragraph } from '../ui'
import { CopyHolder } from '../types/language'

import styles from './MostUsedResourcesCta.module.css'

export const imgSrc: string = './images/ladders.png'
export const url: string = '/checklist'

export const copy: CopyHolder = {
  english: {
    altPicText:
      '3 color illustration of ladders symbolizing success and prosperity',
    tagline: 'We Help You Thrive!',
    article:
      "On ThriveSBC, you will find a variety of resources to help people returning to the greater Santa Barbara area after a jail or prison stay. We know this is a tough task, and we're here to help.",
    button: 'See our most used resources',
  },
  spanish: {
    altPicText:
      'Ilustración de 3 colores de escaleras que simbolizan el éxito y la prosperidad',
    tagline: '¡Te ayudamos a prosperar!',
    article:
      'En ThriveSBC, encontrará una variedad de recursos para ayudar a las personas que regresan al área metropolitana de Santa Bárbara después de una estancia en la cárcel o prisión. Sabemos que esta es una tarea difícil y estamos aquí para ayudar.',
    button: 'Vea nuestros recursos más utilizados',
  },
}

const MostUsedResourcesCta = () => {
  const { push } = useRouter()
  const { language } = useLanguage()

  const { altPicText, tagline, article, button } = copy[language]

  return (
    <CallToAction role="region" blueBg>
      <div className={styles.MostUsedResourcesCta}>
        <div className={styles.PicHolder}>
          <img
            role="img"
            className={styles.Image}
            src={imgSrc}
            alt={altPicText}
          />
        </div>
        <div className={styles.TextHolder}>
          <Title role="heading">{tagline}</Title>
          <Paragraph role="article" size="med-text">
            {article}
          </Paragraph>
          <Button role="button" onClick={() => push(url, url)}>
            {button}
          </Button>
        </div>
      </div>
    </CallToAction>
  )
}

export default MostUsedResourcesCta
