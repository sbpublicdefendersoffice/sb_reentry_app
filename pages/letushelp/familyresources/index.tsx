import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { Op } from 'sequelize'

import {
  PictureWithOval,
  LetUsHelpHeading,
  LetUsHelpCardLayout,
  TagPane,
  DisplayMap,
} from '../../../components'
import { useLanguage, useConvertedLocationRecords } from '../../../hooks/'
import { CopyHolder, PGOrganizationResponse } from '../../../types/'
import { familyResources, flexFullWidth } from '../../../constants/'
import { AdaptiveFlexContainer, Title, Paragraph } from '../../../ui'
import initDb from '../../../helpers/sequelize'

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

interface ResourcesForFamilyAndFriendsLandingProps {
  familyOrgs: PGOrganizationResponse[]
}

const ResourcesForFamilyAndFriendsLanding = ({
  familyOrgs,
}: ResourcesForFamilyAndFriendsLandingProps) => {
  const [fetchedRecords] = useState<PGOrganizationResponse[]>(
    familyOrgs.map(org => ({ ...org, single_category: 'family' })),
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
      <div style={flexFullWidth}>
        <PictureWithOval color="peri" pic="familyFriendsPic.jpg" />
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

export const getStaticProps: GetStaticProps = async () => {
  const { orgObj, locObj, servObj } = initDb()

  const familyOrgs = await orgObj.findAll({
    nest: true,
    where: {
      categories_english: { [Op.contains]: ['family' as string] },
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
      familyOrgs: JSON.parse(JSON.stringify(familyOrgs)),
    },
    revalidate: 3600,
  }
}
