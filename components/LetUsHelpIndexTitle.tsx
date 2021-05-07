import { CallToAction, Title, Paragraph } from '../ui'

import styles from './LetUsHelpIndexTitle.module.css'

interface LetUsHelpIndexTitleProps {
  src: string
  title: string
  whatIs: string
  explain: string
}

const LetUsHelpIndexTitle = ({
  src,
  title,
  whatIs,
  explain,
}: LetUsHelpIndexTitleProps) => (
  <CallToAction role="region" blueBg className={styles.LetUsHelpIndexTitle}>
    <img role="img" className={styles.Image} src={src} />
    <div className={styles.Text}>
      <Title role="heading">{title}</Title>
      <Paragraph role="article" size="med-text" color="highlight">
        {whatIs}
      </Paragraph>
      <Paragraph role="article">{explain}</Paragraph>
    </div>
  </CallToAction>
)

export default LetUsHelpIndexTitle
