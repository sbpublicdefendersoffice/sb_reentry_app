import { useRouter } from 'next/router'
import { useState } from 'react'

import { useLanguage, useResizeEvent } from '../hooks/'
import { CopyHolder } from '../types/language'
import { Title, Button } from '../ui'

const copy: CopyHolder = {
  english: {
    title: 'Unure where to start?',
    title2: 'Let us help',
    buttonText: 'See more help topics',
  },
  spanish: {
    title: '¿No estás seguro por dónde empezar?',
    title2: 'Ayudemos',
    buttonText: 'Ver más temas de ayuda',
  },
}

export const url: string = '/letushelp'

import styles from './UnsureWhereToStart.module.css'

const UnsureWhereToStart = () => {
  const { push } = useRouter()
  const { language } = useLanguage()

  const [isLargeView, setIsLargeView] = useState<boolean>(
    window.innerWidth > 700,
  )

  useResizeEvent((): void =>
    window.innerWidth > 700 ? setIsLargeView(true) : setIsLargeView(false),
  )

  const { title, title2, buttonText } = copy[language]

  return (
    <section className={styles.UnsureWhereToStart}>
      <div className={styles.Column}>
        <Title>{title}</Title>
        <Title className={styles.SecondTitle}>{title2}</Title>
        <Button block onClick={() => push(url, url)} className={styles.Button}>
          {isLargeView ? buttonText : title2}
        </Button>
      </div>
      <img className={styles.Image} src="./images/whereToStartPic.jpg" />
    </section>
  )
}

export default UnsureWhereToStart
