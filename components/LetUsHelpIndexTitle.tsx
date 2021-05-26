import { CallToAction, Title, Paragraph } from '../ui'

import styles from './LetUsHelpIndexTitle.module.css'

interface LetUsHelpIndexTitleProps {
  src: string
  title?: string
  whatIs: string
  explain?: string
  multExplain?: string[]
}

const LetUsHelpIndexTitle = ({
  src,
  title,
  whatIs,
  explain,
  multExplain,
}: LetUsHelpIndexTitleProps) => (
  <CallToAction role="region" blueBg className={styles.LetUsHelpIndexTitle}>
    <img
      role="img"
      className={styles.Image}
      src={src}
      alt="Let us Help Image"
    />
    <div className={styles.Text}>
      {title && <Title role="heading">{title}</Title>}
      <Paragraph role="article" size="med-text" color="highlight">
        {whatIs}
      </Paragraph>
      {explain && <Paragraph role="article">{explain}</Paragraph>}
      {multExplain &&
        multExplain.map((term: string, i: number) => (
          <Paragraph key={i}>{term}</Paragraph>
        ))}
    </div>
  </CallToAction>
)

export default LetUsHelpIndexTitle
