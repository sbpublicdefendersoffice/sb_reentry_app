import { DisplayMap, LocationRecordDisplay } from './'
import { RecordListing } from '../ui'

import useLanguage from '../hooks/useLanguage'
import { SortedRecord } from '../types/records'

import styles from './OrgRecordDisplay.module.css'

interface OrgRecordDisplayProps {
  sortedRecord: SortedRecord
}

const copy = {
  english: { website: 'Site: ', lang: 'Languages Spoken: ' },
  spanish: { website: 'Sitio: ', lang: 'Idiomas Hablados: ' },
}

const OrgRecordDisplay = ({ sortedRecord }: OrgRecordDisplayProps) => {
  const { language } = useLanguage()
  const activeCopy = copy[language]

  const { locations, name, website, languages_spoken, notes } = sortedRecord

  return (
    <div className={styles.OrgRecordDisplay} role="list">
      <RecordListing border={false} className={styles.listing}>
        <h2>{name}</h2>
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
        {Boolean(locations.length) && (
          <>
            <DisplayMap latLongInfo={locations} page="org" />
            {locations.map((locationInfo, i) => (
              <LocationRecordDisplay key={i} locationInfo={locationInfo} />
            ))}
          </>
        )}
      </RecordListing>
    </div>
  )
}

export default OrgRecordDisplay
