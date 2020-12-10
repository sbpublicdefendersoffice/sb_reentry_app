import { LocationRecordDisplay } from './'
import { SortedRecord } from '../types/records'

interface OrgRecordDisplayProps {
  singleFetchedRecord: SortedRecord
}

const OrgRecordDisplay = ({ singleFetchedRecord }: OrgRecordDisplayProps) => {
  const {
    locations,
    // name,
    // website,
    // languages_spoken,
    // notes,
    // categories,
    // tags,
    // id,
  } = singleFetchedRecord

  return (
    <>
      <span>display that org record</span>
      {Boolean(locations.length) &&
        locations.map((locationInfo, i) => (
          <LocationRecordDisplay key={i} locationInfo={locationInfo} />
        ))}
    </>
  )
}

export default OrgRecordDisplay
