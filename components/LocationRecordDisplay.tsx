import { RecordListing } from '../ui'

import {
  // Map,
  ScheduleRecordDisplay,
  SendText,
} from './'
import { LocationRecord } from '../types/records'

import styles from './LocationRecordDisplay.module.css'

interface LocationRecordDisplayProps {
  locationInfo: LocationRecord
}

const LocationRecordDisplay = ({
  locationInfo,
}: LocationRecordDisplayProps) => {
  const {
    schedule,
    name,
    address,
    address_2,
    city,
    state,
    zip,
    services,
    phone,
    website,
    email,
    notes,
    org_name,
    // latitude,
    // longitude,
  } = locationInfo

  const fullAddress: string = `${address || ''}${
    address_2 ? `, ${address_2}` : ''
  }`
  const cityStateZip: string = `${city || ''} ${state || ''}${
    `${city || state ? ', ' : ''}${zip}` || ''
  }`

  const addressForUrl: string = `${fullAddress}+${cityStateZip}`.replace(
    /\s/g,
    '+',
  )

  return (
    <RecordListing className={styles.LocationRecordDisplay}>
      <div
        className={styles.LocationAddressInformation}
        // id="LocationInfo"
      >
        {name && <p>{name}</p>}
        {address && (
          <>
            <h3>Address:</h3>
            <address>
              <p>{fullAddress}</p>
              <p>{cityStateZip}</p>
              <a
                href={`https://www.google.com/maps/place/${addressForUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Find on Google Maps
              </a>
            </address>
            <SendText
              org_name={org_name}
              fullAddress={fullAddress}
              cityStateZip={cityStateZip}
            />
          </>
        )}
        {phone && (
          <>
            <h3>Phone #:</h3>
            <p>{phone}</p>
            <a href={`tel:${phone.replace(/[^0-9]/g, '')}`}>Click to call</a>
          </>
        )}
        {website && (
          <>
            <h3>Location Website:</h3>
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </>
        )}
        {services && (
          <>
            <h3>Services Offered:</h3>
            <p>{services}</p>
          </>
        )}
        {email && (
          <>
            <h3>Email:</h3>
            <p>
              <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {email}
              </a>
            </p>
          </>
        )}
        {notes && <p>{notes}</p>}
        {Boolean(schedule.length) && (
          <>
            <h3>Schedule:</h3>
            {schedule.map((scheduleInfo, i) => (
              <ScheduleRecordDisplay key={i} scheduleInfo={scheduleInfo} />
            ))}
          </>
        )}
      </div>
      {/* <Map latitude={latitude} longitude={longitude} /> */}
    </RecordListing>
  )
}

export default LocationRecordDisplay
