import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { Op } from 'sequelize'

import {
  PictureWithOval,
  LetUsHelpHeading,
  LetUsHelpCardLayout,
  TagPane,
  DisplayMap,
  HeadTags,
} from '../../../components'
import { useLanguage, useConvertedLocationRecords } from '../../../hooks/'
import { CopyHolder, PGOrganizationResponse } from '../../../types/'
import { womensResources, flexFullWidth, siteTitle } from '../../../constants/'
import { AdaptiveFlexContainer, Title, Paragraph } from '../../../ui'
import initDb from '../../../helpers/sequelize'

const copy: CopyHolder = {
  english: {
    title: 'Resources for Cis/Trans Women',
    explainer:
      'Justice involved cisgender women, trans women and gender nonconforming individuals are often overlooked. This can greatly impact their ability to reenter successfully. Below you can find a list of resources that can provide support.',
    heading: 'Featured Resources',
  },
  spanish: {
    title: 'Recursos para Cris/Mujeres Trans',
    explainer:
      'La justicia involucro a mujeres cisgenero, las mujeres trans y las personas no conforme con el género a menudo se pasan por alto.  Esto puede afectar en gran medida su capacidad para volver a ingresar con éxito. A continuación, puede encontrar una lista de recursos que pueden proporcionar apoyo.',
    heading: 'Recursos Destacados',
  },
}

interface ResourcesForWomenLandingProps {
  womenOrgs: PGOrganizationResponse[]
}

const ResourcesForWomenLanding = ({
  womenOrgs,
}: ResourcesForWomenLandingProps) => {
  const [fetchedRecords] = useState<PGOrganizationResponse[]>(
    womenOrgs.map(org => ({ ...org, single_category: 'women' })),
  )
  const { convertedLocRecords, setLocationRecords } =
    useConvertedLocationRecords()
  const { language } = useLanguage()
  const { title, explainer, heading } = copy[language]

  useEffect(() => {
    if (fetchedRecords) setLocationRecords(fetchedRecords)
  }, [fetchedRecords])

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${title}`}
        href="/letushelp/resourcesforwomen"
        description="ThriveSBC's collection of resources for cis and trans women"
      />
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

export const getStaticProps: GetStaticProps = async () => {
  const { orgObj, locObj, servObj } = initDb()

  const womenOrgs = await orgObj.findAll({
    nest: true,
    where: {
      categories_english: { [Op.contains]: ['women' as string] },
    },
    attributes: [
      'id',
      `categories_english`,
      `categories_spanish`,
      `name_english`,
      `name_spanish`,
      `tags_english`,
      `tags_spanish`,
      `customers_served_english`,
      `customers_served_spanish`,
      `languages_spoken_english`,
      `languages_spoken_spanish`,
      ['categories_english', 'multiple_categories'],
    ],
    include: [
      {
        model: locObj,
        required: false,
        attributes: ['latitude', 'longitude', 'city'],
        through: { attributes: [] },
        include: [
          {
            model: servObj,
            required: false,
            attributes: [`name_english`, `name_spanish`],
            through: { attributes: [] },
          },
        ],
      },
    ],
    order: [[`name_english`, 'ASC']],
  })

  return {
    props: {
      womenOrgs: JSON.parse(JSON.stringify(womenOrgs)),
    },
    revalidate: 3600,
  }
}
