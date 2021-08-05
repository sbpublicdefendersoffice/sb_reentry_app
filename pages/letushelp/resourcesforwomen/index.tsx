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
import { womensResources, flexFullWidth } from '../../../constants/'
import { AdaptiveFlexContainer, Title, Paragraph } from '../../../ui'

const copy: CopyHolder = {
  english: {
    title: 'Resources for Cis/Trans Women',
    explainer:
      'Justice involved cisgender women, trans women and gender nonconforming individuals are often overlooked. This can greatly impact their ability to reenter successfully. Below you can find a list of resources that can provide support.',
    heading: 'Featured Resources',
  },
  spanish: {
    title: 'Recursos para mujeres Cis/Trans',
    explainer:
      'La justicia involucra a mujeres cisgénero, mujeres trans e individuos no conformes con el género a menudo se pasa por alto. Esto puede afectar en gran medida su capacidad para reingresar con éxito. A continuación, puede encontrar una lista de recursos que pueden brindar apoyo.',
    heading: 'Recursos destacados',
  },
}

const ResourcesForWomenLanding = () => {
  const { fetchedRecords } = useMultipleListRecords('women')
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
        <PictureWithOval color="peri" pic="resourcesWomenPic.jpg" />
        <LetUsHelpHeading>
          <Title>{title}</Title>
          <Paragraph size="med-text">{explainer}</Paragraph>
        </LetUsHelpHeading>
      </div>
      <LetUsHelpCardLayout heading={heading} cards={womensResources} />
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

export default ResourcesForWomenLanding
