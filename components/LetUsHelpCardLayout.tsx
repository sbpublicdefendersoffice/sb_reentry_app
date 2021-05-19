import { Fragment } from 'react'
import { useRouter } from 'next/router'

import { CallToAction, Card, Title, Paragraph } from '../ui'
import { url } from '../constants/cards'
import { CopyHolder, CardInfo } from '../types/'
import useLanguage from '../hooks/useLanguage'

interface LetUsHelpCardLayoutProps {
  heading?: string
  cards: CardInfo[]
}

const copy: CopyHolder = {
  english: {
    click: 'Click here to learn more',
  },
  spanish: {
    click: 'Clic aquí para saber más',
  },
}

import styles from './LetUsHelpCardLayout.module.css'

const LetUsHelpCardLayout = ({ heading, cards }: LetUsHelpCardLayoutProps) => {
  const { push } = useRouter()
  const { language } = useLanguage()
  const { click } = copy[language]

  return (
    <CallToAction blueBg>
      {heading && <Title>{heading}</Title>}
      <div className={styles.LetUsHelpCardContainer}>
        {cards.map((card: CardInfo, i: number) => {
          const [title, copy] = [
            card[`title_${language}`],
            card[`copy_${language}`],
          ]
          const { id } = card

          return (
            <Fragment key={i}>
              <Card className={styles.Card} border={false}>
                <Paragraph className={styles.Heading} size="heading-text">
                  {title}
                </Paragraph>
                <Paragraph className={styles.Explainer} size="med-text">
                  {copy}
                </Paragraph>
                <Paragraph
                  className={styles.Link}
                  size="med-text"
                  onClick={() => push(url, `/search/${id}`)}
                >
                  {click}
                </Paragraph>
              </Card>
            </Fragment>
          )
        })}
      </div>
    </CallToAction>
  )
}

export default LetUsHelpCardLayout
