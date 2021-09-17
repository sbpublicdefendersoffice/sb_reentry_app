import useLanguage from '../../../hooks/useLanguage'
import { Title, Paragraph } from '../../../ui'
import {
  PictureWithOval,
  LetUsHelpHeading,
  LetUsHelpCardLayout,
  HeadTags,
} from '../../../components'
import {
  recommendedResources,
  recommendedResourcesCopy,
  flexFullWidth,
  siteTitle,
} from '../../../constants/'

const RecommendedResourcesLanding = () => {
  const { language } = useLanguage()
  const { title, explainer, heading } = recommendedResourcesCopy[language]

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${title}`}
        href="/letushelp/recommendedresources"
        description="Resources we highly recommend"
      />
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
