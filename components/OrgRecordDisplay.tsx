import { LocationRecordDisplay } from './'
import { RecordListing } from '../ui'

import { SortedRecord } from '../types/records'

import styles from './OrgRecordDisplay.module.css'

interface OrgRecordDisplayProps {
  singleFetchedRecord: SortedRecord
}

const OrgRecordDisplay = ({ singleFetchedRecord }: OrgRecordDisplayProps) => {
  const {
    locations,
    name,
    website,
    languages_spoken,
    notes,
  } = singleFetchedRecord

  return (
    <>
      <h2>{name}</h2>
      <RecordListing className={styles.OrgRecordDisplay}>
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
            <h3>Locations:</h3>
            {locations.map((locationInfo, i) => (
              <LocationRecordDisplay key={i} locationInfo={locationInfo} />
            ))}
          </>
        )}
      </RecordListing>
    </>
  )
}

export default OrgRecordDisplay
