import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'

// import { useRouter } from 'next/router'
// import { useEffect } from 'react'
// import Head from 'next/head'

// import {
//   useSingleRecord,
//   useLanguage,
//   useConvertedLocationRecords,
// } from '../../hooks'
// import { LeafLoader, DisplayMap, OrgRecordDisplay } from '../../components'
// import { siteTitle } from '../../constants/copy'
import { PGOrganizationResponse } from '../../types'
import initDb from '../../helpers/sequelize'

interface IdPageProps {
  fetchedOrg: PGOrganizationResponse
}

const OrgIdPage = ({ fetchedOrg }: IdPageProps) => {
  //   const { asPath } = useRouter()
  //   const { language } = useLanguage()
  //   const { sortedRecord } = useSingleRecord()
  //   const { convertedLocRecords, setLocationRecords } =
  //     useConvertedLocationRecords()

  console.log(fetchedOrg)

  //   useEffect(() => {
  //     if (sortedRecord) setLocationRecords([sortedRecord])
  //   }, [sortedRecord])

  //   if (asPath.startsWith('/[category]') || !sortedRecord) return <LeafLoader />

  //   return (
  //     <>
  //       <Head>
  //         <title>{`${siteTitle} | ${sortedRecord?.[`name_${language}`]}`}</title>
  //       </Head>
  //       <OrgRecordDisplay sortedRecord={sortedRecord} />
  //       {Boolean(convertedLocRecords?.length) && (
  //         <DisplayMap latLongInfo={convertedLocRecords} />
  //       )}
  //     </>
  //   )

  return <span>hello</span>
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
    raw: true,
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

  return { props: { fetchedOrg }, revalidate: 3600 }
}
