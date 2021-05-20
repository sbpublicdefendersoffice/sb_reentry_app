import useLanguage from '../../../hooks/useLanguage'
import { Title, Paragraph } from '../../../ui'

import {
  PictureWithOval,
  LetUsHelpHeading,
  LetUsHelpCardLayout,
} from '../../../components'
import {
  recommendedResources,
  recommendedResourcesCopy,
} from '../../../constants/cards'

const RecommendedResourcesLanding = () => {
  const { language } = useLanguage()
  const { title, explainer, heading } = recommendedResourcesCopy[language]

  return (
    <>
      <div style={{ width: '100%', display: 'flex' }}>
        <PictureWithOval
          color="var(--peri)"
          pic="resourcesforwomen_placeholder.png"
        />
        <LetUsHelpHeading>
          <Title>{title}</Title>
          <Paragraph size="med-text">{explainer}</Paragraph>
        </LetUsHelpHeading>
      </div>
      <LetUsHelpCardLayout heading={heading} cards={recommendedResources} />
    </>
  )
}

export default RecommendedResourcesLanding
