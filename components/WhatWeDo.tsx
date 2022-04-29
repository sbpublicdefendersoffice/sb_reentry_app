import { Title, Paragraph } from '../ui'
import { CopyHolder } from '../types'
import { useLanguage } from '../hooks'
import { ENGLISH } from '../constants'

import styles from './WhatWeDo.module.css'

const whatWeDoIcons: string[] = ['support', 'accurate', 'community']
const whatWeDoText: CopyHolder[] = [
  {
    english: {
      title: 'Support',
      copy: 'Our job is to help connect you to the resources you need to live your life.',
    },
    spanish: {
      title: 'Apoyo',
      copy: 'Nuestro trabajo es ayudarlo a conectarse con los recursos que necesita para vivir su vida.',
    },
  },
  {
    english: {
      title: 'Provide Accurate Information',
      copy: 'We strive to make sure our information is as up to date and helpful as possible.',
    },
    spanish: {
      title: 'Proporcionar Información Precisa',
      copy: 'Nos esforzamos por hacer nuestra información esta actualizada y útil como sea posible.',
    },
  },
  {
    english: {
      title: 'Community Outreach',
      copy: "Maintained by the Santa Barbara Public Defender's office, we're an active part of our community.",
    },
    spanish: {
      title: 'Alcance Comunitario',
      copy: 'Mantenido por la oficina del Defensor Público de Santa Barbara, somos parte activa de la comunidad.',
    },
  },
]

const WhatWeDo = () => {
  const { language } = useLanguage()

  return (
    <section className={styles.WhatWeDo}>
      <Title>{language === ENGLISH ? 'What We Do' : 'Que Hacemos'}</Title>
      <div className={styles.Holder}>
        {whatWeDoText.map((text: CopyHolder, i: number) => {
          const { title, copy } = text[language]

          return (
            <div key={i} className={styles.Resource}>
              <img
                className={styles.Image}
                src={`./icons/${whatWeDoIcons[i]}.svg`}
                loading="lazy"
              />
              <Paragraph className={styles.Title} color="highlight">
                {title}
              </Paragraph>
              <Paragraph className={styles.Copy}>{copy}</Paragraph>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default WhatWeDo
