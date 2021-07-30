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
  flexFullWidth,
} from '../../../constants/'

const RecommendedResourcesLanding = () => {
  const { language } = useLanguage()
  const { title, explainer, heading } = recommendedResourcesCopy[language]

  return (
    <>
      <div style={flexFullWidth}>
        <PictureWithOval color="highlight" pic="recResourcesPic.jpg" />
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
