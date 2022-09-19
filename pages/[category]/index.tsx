import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { Op } from 'sequelize'
import { useState } from 'react'
import { Modal, Hidden, Grid, Box } from '@mui/material'

import {
  useConvertedLocationRecords,
  useLanguage,
  useSearchFilters,
} from '../../hooks/'
import {
  DisplayMap,
  MobileFilterModal,
  MobileButtonsLandingPage,
  RecordPane,
  HeadTags,
} from '../../components'
import {
  categoryCopy,
  siteTitle,
  categories,
  useStyles,
} from '../../constants/'

import { PGOrganizationResponse } from '../../types'
import initDb from '../../helpers/sequelize'

interface LandingPageProps {
  width: string
  preFetchedOrgs: PGOrganizationResponse[]
}

const LandingPage = ({ preFetchedOrgs }: LandingPageProps) => {
  const { asPath } = useRouter()
  const { language } = useLanguage()
  const classes = useStyles()

  const activeCopy = categoryCopy[language]
  const validCategory = categories[asPath]
  const routeCategory: string = validCategory?.english.category.toLowerCase()
  const displayDescription: string = validCategory?.[language].description
  const displayCategory: string = validCategory?.[language].category

  const [fetchedRecords] = useState<PGOrganizationResponse[]>(
    preFetchedOrgs.map(org => ({ ...org, single_category: routeCategory })),
  )
  const { convertedLocRecords, setLocationRecords } =
    useConvertedLocationRecords()
  const { searchFilteredResults, fields, handleFieldsSelected } =
    useSearchFilters({
      validCategory,
      fetchedRecords,
      setLocationRecords,
    })

  const [open, setOpen] = useState<boolean>(false)

  if (!validCategory) return <Error statusCode={404} />
  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${displayCategory}`}
        href={`/${routeCategory}`.replace(/\s/g, '')}
        description={`A list of all ${routeCategory} resources on ThriveSBC`}
      />
      <div className={classes.landingPageContainer}>
        <Grid container>
          <Box sx={{ display: { md: 'block', lg: 'none' } }}>
            <MobileButtonsLandingPage
              activeCopy={activeCopy}
              setOpen={setOpen}
              showFilter={true}
            />
          </Box>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <>
              <MobileFilterModal
                fields={fields}
                handleFieldsSelected={handleFieldsSelected}
                routeCategory={routeCategory}
                setOpen={setOpen}
                activeCopy={activeCopy}
              />
            </>
          </Modal>
          <RecordPane
            orgInfo={searchFilteredResults}
            displayCategory={displayCategory}
            displayDescription={displayDescription}
            routeCategory={routeCategory}
            fields={fields}
            handleFieldsSelected={handleFieldsSelected}
            activeCopy={activeCopy}
          />
          {convertedLocRecords && (
            <DisplayMap latLongInfo={convertedLocRecords} />
          )}
        </Grid>
      </div>
    </>
  )
}

export default LandingPage

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(categories).map((route: string) => ({
    params: { category: route.slice(1) },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { orgObj, locObj, servObj } = initDb()

  const operator: string =
    categories[`/${params.category}`].english.category.toLowerCase()

  const foundOrgs = await orgObj.findAll({
    nest: true,
    where: {
      categories_english: { [Op.contains]: [operator] },
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
      preFetchedOrgs: JSON.parse(JSON.stringify(foundOrgs)),
    },
    revalidate: 3600,
  }
}
