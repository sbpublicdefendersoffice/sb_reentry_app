import { DisplayMap, LocationRecordDisplay, LeafLoader } from './'
import { Details } from '../ui'

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
  },
  spanish: {
    orgInfo: 'Información de la Organización',
    website: 'Sitio: ',
    lang: 'Idiomas Hablados: ',
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
        <h1 className={styles.heading}>{name}</h1>
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
          <Details open summary="Locations">
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
