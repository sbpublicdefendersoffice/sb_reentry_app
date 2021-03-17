import { DisplayMap, LocationRecordDisplay, LeafLoader } from './'
import { Details, Title } from '../ui'

import useLanguage from '../hooks/useLanguage'
import { SortedRecord } from '../types/records'
import { CopyHolder } from '../types/language'

import styles from './OrgRecordDisplay.module.css'
import { Paragraph } from '../ui'

interface OrgRecordDisplayProps {
  sortedRecord: SortedRecord
}

const copy: CopyHolder = {
  english: {
    orgInfo: 'Organization Info',
    website: 'Site: ',
    lang: 'Languages Spoken: ',
    location: 'Locations',
  },
  spanish: {
    orgInfo: 'Información de la Organización',
    website: 'Sitio: ',
    lang: 'Idiomas Hablados: ',
    location: 'Ubicaciones',
  },
}

const OrgRecordDisplay = ({ sortedRecord }: OrgRecordDisplayProps) => {
  const { language } = useLanguage()
  const activeCopy = copy[language]

  if (!sortedRecord) return <LeafLoader />

  const { locations, name, website, languages_spoken, notes } = sortedRecord

  return (
    <div className={styles.OrgRecordDisplay} role="list">
      <Details open summary={activeCopy.orgInfo} className={styles.listing}>
        <Title>{name}</Title>
        {website && (
          <Paragraph size="med-text">
            {activeCopy.website}
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </Paragraph>
        )}
        {languages_spoken && (
          <Paragraph size="med-text">
            {activeCopy.lang}
            {languages_spoken}
          </Paragraph>
        )}
        {notes && <Paragraph size="med-text">{notes}</Paragraph>}
      </Details>
      {Boolean(locations.length) && (
        <>
          <DisplayMap latLongInfo={locations} page="org" />
          <Details open summary={activeCopy.location}>
            {locations.map((locationInfo, i) => (
              <LocationRecordDisplay
                key={i}
                locationInfo={locationInfo}
                id={String(i)}
              />
            ))}
          </Details>
        </>
      )}
    </div>
  )
}

export default OrgRecordDisplay
