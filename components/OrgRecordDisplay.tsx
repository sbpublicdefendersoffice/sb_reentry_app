import { Disclaimer, LocationRecordDisplay } from './'
import { Details, Title } from '../ui'

import useLanguage from '../hooks/useLanguage'
import { SortedRecord, CopyHolder } from '../types'

import styles from './OrgRecordDisplay.module.css'
import { Paragraph } from '../ui'

interface OrgRecordDisplayProps {
  sortedRecord: SortedRecord
}

const copy: CopyHolder = {
  english: {
    orgInfo: 'Organization Information',
    description: 'Description',
    thingsToKnow: 'Some Things To Know',
    website: 'Site: ',
    lang: 'Languages Spoken: ',
    location: 'Locations',
  },
  spanish: {
    orgInfo: 'Información de la organización',
    description: 'Descripción',
    thingsToKnow: 'Algunas cosas para saber',
    website: 'Sitio: ',
    lang: 'Idiomas Hablados: ',
    location: 'Ubicaciones',
  },
}

const OrgRecordDisplay = ({ sortedRecord }: OrgRecordDisplayProps) => {
  const { language } = useLanguage()
  const activeCopy = copy[language]

  const { locations, name, website, languages_spoken, notes } = sortedRecord

  return (
    <div className={styles.OrgRecordDisplay} role="list">
      <Details open summary={activeCopy.orgInfo} className={styles.listing}>
        <Title className={styles.DisplayTitle}>{name}</Title>
        {notes && (
          <>
            <Paragraph size="heading-text">{activeCopy.description}:</Paragraph>
            <Paragraph size="med-text">{notes}</Paragraph>
          </>
        )}
        {website || languages_spoken ? (
          <>
            <Paragraph size="heading-text">
              {activeCopy.thingsToKnow}:
            </Paragraph>
            {website && (
              <Paragraph size="med-text">
                <strong>{activeCopy.website}</strong>
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {website}
                </a>
              </Paragraph>
            )}
            {languages_spoken && (
              <Paragraph size="med-text">
                <strong>{activeCopy.lang}</strong>
                {languages_spoken}
              </Paragraph>
            )}
          </>
        ) : null}
        <Disclaimer />
      </Details>
      {Boolean(locations?.length) && (
        <Details open summary={activeCopy.location}>
          <Paragraph className={styles.LocationHeading} size="heading-text">
            {activeCopy.location}:
          </Paragraph>
          {locations.map((locationInfo, i) => (
            <LocationRecordDisplay
              key={i}
              locationInfo={locationInfo}
              id={String(i)}
            />
          ))}
        </Details>
      )}
    </div>
  )
}

export default OrgRecordDisplay
