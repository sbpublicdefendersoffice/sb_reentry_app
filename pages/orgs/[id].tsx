import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useEffect } from 'react'

import { useLanguage, useConvertedLocationRecords } from '../../hooks'
import { DisplayMap, OrgRecordDisplay, HeadTags } from '../../components'
import { siteTitle } from '../../constants/copy'
import { PGOrganizationResponse } from '../../types'
import initDb from '../../helpers/sequelize'

interface OrgIdPageProps {
  fetchedOrg: PGOrganizationResponse
}

const OrgIdPage = ({ fetchedOrg }: OrgIdPageProps) => {
  const { language } = useLanguage()

  const { convertedLocRecords, setLocationRecords } =
    useConvertedLocationRecords()

  useEffect(() => {
    if (fetchedOrg) setLocationRecords([fetchedOrg])
  }, [fetchedOrg])

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${fetchedOrg?.[`name_${language}`]}`}
        href={`/orgs/${fetchedOrg?.id}`}
        description={`${fetchedOrg?.[`name_${language}`]} on ${siteTitle}`}
      />
      <OrgRecordDisplay sortedRecord={fetchedOrg} />
      {Boolean(convertedLocRecords?.length) && (
        <DisplayMap latLongInfo={convertedLocRecords} />
      )}
    </>
  )
}

export default OrgIdPage

export const getStaticPaths: GetStaticPaths = async () => {
  const { orgObj } = initDb()

  const returnedOrgs = await orgObj.findAll({
    raw: true,
    nest: true,
    attributes: ['id'],
  })

  const paths = returnedOrgs.map(({ id }) => ({
    params: { id: String(id) },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { orgObj, locObj, servObj, schObj } = initDb()
  const { id } = params

  const fetchedOrg = await orgObj.findOne({
    nest: true,
    where: { id },
    attributes: [
      'id',
      `name_english`,
      `name_spanish`,
      'website',
      `languages_spoken_english`,
      `languages_spoken_spanish`,
      `customers_served_english`,
      `customers_served_spanish`,
      `notes_english`,
      `notes_spanish`,
      `tags_english`,
      `tags_spanish`,
      ['categories_english', 'multiple_categories'],
    ],
    include: [
      {
        model: locObj,
        required: false,
        through: { attributes: [] },
        include: [
          {
            model: servObj,
            required: false,
            attributes: ['id', `name_english`, `name_spanish`],
            through: { attributes: [] },
          },
          {
            model: schObj,
            required: false,
            through: { attributes: [] },
          },
        ],
      },
    ],
  })

  return {
    props: { fetchedOrg: JSON.parse(JSON.stringify(fetchedOrg)) },
    revalidate: 3600,
  }
}
