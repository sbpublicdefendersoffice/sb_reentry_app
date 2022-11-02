import LocationRecordDisplay from './LocationRecordDisplay'
import Disclaimer from './Disclaimer'
import { Details, Title, Paragraph } from '../ui'
import { Favorite, FavoriteBorder } from '@mui/icons-material'

import { Grid } from '@mui/material'
import { useLanguage, useFavorite } from '../hooks/'
import { CopyHolder, PGOrganizationResponse } from '../types'
import styles from './OrgRecordDisplay.module.css'

interface OrgRecordDisplayProps {
  sortedRecord: PGOrganizationResponse
}
export const copy: CopyHolder = {
  english: {
    orgInfo: 'Organization Information',
    description: 'Description:',
    thingsToKnow: 'Some Things To Know:',
    website: 'Site:',
    lang: 'Languages Spoken:',
    location: 'Locations:',
  },
  spanish: {
    orgInfo: 'Información de la organización',
    description: 'Descripción:',
    thingsToKnow: 'Algunas cosas para saber:',
    website: 'Sitio:',
    lang: 'Idiomas Hablados:',
    location: 'Ubicaciones:',
  },
}
const OrgRecordDisplay = ({ sortedRecord }: OrgRecordDisplayProps) => {
  const { language } = useLanguage()
  const activeCopy = copy[language]
  const { favoriteResources, updateFavoriteResources } = useFavorite()
  const [org_name, languages_spoken, notes]: string[] = [
    sortedRecord[`name_${language}`],
    sortedRecord[`languages_spoken_${language}`],
    sortedRecord[`notes_${language}`],
  ]
  const { website, locations, id } = sortedRecord
  const isFavIcon = <Favorite style={{ color: '#13385E', fontSize: '3rem' }} />
  const isNotFavIcon = (
    <FavoriteBorder style={{ color: '#13385E', fontSize: '3rem' }} />
  )
  const heart = favoriteResources.some(item => item.id === id)
    ? isFavIcon
    : isNotFavIcon
  const clickHeart = e => {
    e.preventDefault()
    updateFavoriteResources(sortedRecord.id, sortedRecord)
  }
  if (localStorage.getItem('favorites') === null) {
    localStorage.setItem('favorites', '[]')
  }
  if (localStorage.getItem('favoriteRecords') === null) {
    localStorage.setItem('favoriteRecords', '[]')
  }
  return (
    <div role="menu" className={styles.OrgRecordDisplay}>
      <Grid container>
        <Grid item md={7}>
          <Title role="heading" className={styles.DisplayTitle}>
            {org_name}
          </Title>
        </Grid>
        <Grid
          item
          md={5}
          style={{
            display: 'flex',

            flexDirection: 'row-reverse',
          }}
        >
          <button
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              // margin: 'auto',
              flexDirection: 'row-reverse',
              margin: '10%',
            }}
            id={String(id)}
            onClick={clickHeart}
          >
            <div>{heart}</div>
          </button>
        </Grid>
      </Grid>
      <Details open summary={activeCopy.orgInfo} className={styles.listing}>
        {notes && (
          <>
            <Paragraph role="term" size="heading-text">
              {activeCopy.description}
            </Paragraph>
            <Paragraph size="med-text">{notes}</Paragraph>
          </>
        )}
        {website || languages_spoken ? (
          <>
            <Paragraph role="term" size="heading-text">
              {activeCopy.thingsToKnow}
            </Paragraph>
            {website && (
              <Paragraph className={styles.Website} size="med-text">
                <img src={'/icons/website.svg'}></img>
                {/* <strong role="term">{activeCopy.website} </strong> */}
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {website}
                </a>
              </Paragraph>
            )}
            {languages_spoken && (
              <Paragraph size="med-text">
                <strong role="term">{activeCopy.lang} </strong>
                <span>{languages_spoken}</span>
              </Paragraph>
            )}
          </>
        ) : null}
        <Disclaimer />
      </Details>
      {Boolean(locations?.length) && (
        <Details open summary={activeCopy.location}>
          <Paragraph
            role="term"
            className={styles.LocationHeading}
            size="heading-text"
          >
            {activeCopy.location}
          </Paragraph>
          {locations.map((locationInfo, i) => {
            return (
              <LocationRecordDisplay
                // @ts-ignore
                id={String(i)}
                key={i}
                org_name={org_name}
                {...locationInfo}
              />
            )
          })}
        </Details>
      )}
    </div>
  )
}
export default OrgRecordDisplay
