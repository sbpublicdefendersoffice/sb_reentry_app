import { ScheduleRecordDisplay } from './'
import { LocationRecord } from '../types/records'

interface LocationRecordDisplayProps {
  locationInfo: LocationRecord
}

const LocationRecordDisplay = ({
  locationInfo,
}: LocationRecordDisplayProps) => {
  const { schedule } = locationInfo

  return (
    <>
      <span>display dat location</span>
      {Boolean(schedule.length) &&
        schedule.map((scheduleInfo, i) => (
          <ScheduleRecordDisplay key={i} scheduleInfo={scheduleInfo} />
        ))}
    </>
  )
}

export default LocationRecordDisplay
