import { DisplayMap, LocationRecordDisplay, LeafLoader } from './'
import { Details, Title } from '../ui'

import useLanguage from '../hooks/useLanguage'
import { SortedRecord } from '../types/records'
import { CopyHolder } from '../types/language'

import styles from './OrgRecordDisplay.module.css'

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
          <p>
            {activeCopy.website}
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </p>
        )}
        {languages_spoken && (
          <p>
            {activeCopy.lang}
            {languages_spoken}
          </p>
        )}
        {notes && <p>{notes}</p>}
      </Details>
      {Boolean(locations.length) && (
        <>
          <DisplayMap latLongInfo={locations} page="org" />
          <Details open summary={activeCopy.location}>
            {locations.map((locationInfo, i) => (
              <LocationRecordDisplay key={i} locationInfo={locationInfo} />
            ))}
          </Details>
        </>
      )}
    </div>
  )
}

export default OrgRecordDisplay
