import { RecordListing, Paragraph } from '../ui'

import { ScheduleRecordDisplay, SendText } from './'
import { LocationRecord } from '../types/records'

import useLanguage from '../hooks/useLanguage'
import { CopyHolder } from '../types/language'

import styles from './LocationRecordDisplay.module.css'

interface LocationRecordDisplayProps {
  locationInfo: LocationRecord
}

const copy: CopyHolder = {
  english: {
    address: 'Address',
    find: 'Find on Google Maps',
    phone: 'Phone #',
    call: 'Click to call',
    locationSite: 'Location Website',
    services: 'Services Offered',
    email: 'Email',
    schedule: 'Schedule',
  },
  spanish: {
    address: 'Dirección',
    find: 'Buscar en Google Maps',
    phone: 'Teléfono #',
    call: 'Haz clic para llamar',
    locationSite: 'Ubicación Página Web',
    services: 'Servicios Ofrecidos',
    email: 'Correo',
    schedule: 'Calendario',
  },
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
  } = locationInfo

  const { language } = useLanguage()
  const activeCopy = copy[language]

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
      <div className={styles.LocationAddressInformation}>
        {name && <Paragraph size="med-text">{name}</Paragraph>}
        {address && (
          <>
            <h3 className={styles.heading}>{activeCopy.address}:</h3>
            <address>
              <Paragraph size="med-text">{fullAddress}</Paragraph>
              <Paragraph size="med-text">{cityStateZip}</Paragraph>
              <a
                href={`https://www.google.com/maps/place/${addressForUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {activeCopy.find}
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
            <h3 className={styles.heading}>{activeCopy.phone}:</h3>
            <Paragraph size="med-text">{phone}</Paragraph>
            <a href={`tel:${phone.replace(/[^0-9]/g, '')}`}>
              {activeCopy.call}
            </a>
          </>
        )}
        {website && (
          <>
            <h3 className={styles.heading}>{activeCopy.locationSite}:</h3>
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </>
        )}
        {services && (
          <>
            <h3 className={styles.heading}>{activeCopy.services}:</h3>
            <Paragraph size="med-text">{services}</Paragraph>
          </>
        )}
        {email && (
          <>
            <h3 className={styles.heading}>{activeCopy.email}:</h3>
            <Paragraph size="med-text">
              <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {email}
              </a>
            </Paragraph>
          </>
        )}
        {notes && <Paragraph size="med-text">{notes}</Paragraph>}
        {Boolean(schedule.length) && (
          <>
            <h3 className={styles.heading}>{activeCopy.schedule}:</h3>
            {schedule.map((scheduleInfo, i) => (
              <ScheduleRecordDisplay key={i} scheduleInfo={scheduleInfo} />
            ))}
          </>
        )}
      </div>
    </RecordListing>
  )
}

export default LocationRecordDisplay
