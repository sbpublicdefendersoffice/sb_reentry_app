import { DisplayMap, LocationRecordDisplay } from './'
import { RecordListing } from '../ui'

import { SortedRecord } from '../types/records'

import styles from './OrgRecordDisplay.module.css'

interface OrgRecordDisplayProps {
  sortedRecord: SortedRecord
}

const OrgRecordDisplay = ({ sortedRecord }: OrgRecordDisplayProps) => {
  const { locations, name, website, languages_spoken, notes } = sortedRecord

  return (
    <div className={styles.OrgRecordDisplay} role="list">
      <RecordListing border={false} className={styles.listing}>
        <h2>{name}</h2>
        {website && (
          <p>
            Org Website:{' '}
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </p>
        )}
        {languages_spoken && <p>Languages Spoken: {languages_spoken}</p>}
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
