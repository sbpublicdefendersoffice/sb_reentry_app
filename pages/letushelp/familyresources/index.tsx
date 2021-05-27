import { useEffect } from 'react'

import {
  PictureWithOval,
  LetUsHelpHeading,
  LetUsHelpCardLayout,
  TagPane,
  DisplayMap,
} from '../../../components'
import {
  useMultipleListRecords,
  useLanguage,
  useConvertedLocationRecords,
} from '../../../hooks/'
import { CopyHolder } from '../../../types/language'
import { familyResources, flexFullWidth } from '../../../constants/'
import { AdaptiveFlexContainer, Title, Paragraph } from '../../../ui'

const copy: CopyHolder = {
  english: {
    title: 'Resources for Family and Friends',
    explainer:
      'Having a family member or a friend that is justice involved can be tough. Here you can find resources that can help you and your loved one.',
    heading: 'Featured Resources',
  },
  spanish: {
    title: 'Recursos para familiares y amigos',
    explainer:
      'Tener un familiar o un amigo involucrado en la justicia puede ser difícil. Aquí puede encontrar recursos que pueden ayudarlo a usted y a su ser querido.',
    heading: 'Recursos destacados',
  },
}

const ResourcesForFamilyAndFriendsLanding = () => {
  const { fetchedRecords } = useMultipleListRecords('family')
  const { convertedLocRecords, setLocationRecords } =
    useConvertedLocationRecords()
  const { language } = useLanguage()
  const { title, explainer, heading } = copy[language]

  useEffect(() => {
    if (fetchedRecords) setLocationRecords(fetchedRecords)
  }, [fetchedRecords])

  return (
    <>
      <div style={flexFullWidth}>
        <PictureWithOval color="peri" pic="familyFriendsPic.jpeg" />
        <LetUsHelpHeading>
          <Title>{title}</Title>
          <Paragraph size="med-text">{explainer}</Paragraph>
        </LetUsHelpHeading>
      </div>
      <LetUsHelpCardLayout heading={heading} cards={familyResources} />
      <Paragraph size="heading-text" style={{ margin: 'var(--margin-std) 0' }}>
        {title}
      </Paragraph>
      <AdaptiveFlexContainer>
        {fetchedRecords && <TagPane orgInfo={fetchedRecords} />}
        {convertedLocRecords && (
          <DisplayMap latLongInfo={convertedLocRecords} />
        )}
      </AdaptiveFlexContainer>
    </>
  )
}

export default ResourcesForFamilyAndFriendsLanding
