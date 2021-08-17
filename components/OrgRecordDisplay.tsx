import { useContext } from 'react'
import { Disclaimer, LocationRecordDisplay } from './'
import { Details, Title, Paragraph } from '../ui'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import {Grid} from '@material-ui/core'
import {useLanguage, FavoriteContext} from '../hooks/'
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
  const { favoriteResources, updateFavoriteResources } = useContext(
    FavoriteContext
  );
  const [org_name, languages_spoken, notes]: string[] = [
    sortedRecord[`name_${language}`],
    sortedRecord[`languages_spoken_${language}`],
    sortedRecord[`notes_${language}`],
  ]
  const { website, locations, id } = sortedRecord
  const isFavIcon = <FavoriteIcon style={{color: "#13385E", fontSize: "3rem"}}/>;
  const isNotFavIcon = <FavoriteBorderIcon style={{color: "#13385E", fontSize: "3rem"}}/>;
  const heart = favoriteResources.some(item =>  item.id === id) ? isFavIcon : isNotFavIcon
  const clickHeart = (e) => {
    e.preventDefault();
    updateFavoriteResources(sortedRecord.id, sortedRecord);
  };
  if (localStorage.getItem("favorites") === null) {
    localStorage.setItem("favorites", "[]");
  }
  if (localStorage.getItem("favoriteRecords") === null) {
    localStorage.setItem("favoriteRecords", "[]");
  }
  return (
    <div role="menu" className={styles.OrgRecordDisplay}>
          <Title role="heading" className={styles.DisplayTitle}>
          {org_name}
        </Title>
  <Grid container justify="flex-end">
        <button style={{background: "none", border: "none", marginTop: "-8rem"} } id={String(id)} onClick={(clickHeart)}>
        <div className="resource-favorite">{heart}</div>
        </button>
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
              <Paragraph size="med-text">
                <strong role="term">{activeCopy.website} </strong>
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
