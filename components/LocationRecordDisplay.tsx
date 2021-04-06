import { Card, Paragraph } from '../ui'

import { ScheduleRecordDisplay, SendText } from './'
import { LocationRecord, CopyHolder } from '../types'
import { useLanguage, useLocation } from '../hooks'

import styles from './LocationRecordDisplay.module.css'

interface LocationRecordDisplayProps {
  locationInfo: LocationRecord
  id: string
}

const copy: CopyHolder = {
  english: {
    address: 'Address',
    find: 'Get Directions On Google Maps',
    phone: 'Phone #',
    call: 'Click to call',
    locationSite: 'Location Website',
    services: 'Services Offered',
    email: 'Email',
    schedule: 'Schedule',
  },
  spanish: {
    address: 'Dirección',
    find: 'Obtener direcciones en Google Maps',
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
  id,
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

  const { coords } = useLocation()

  const { language } = useLanguage()
  const activeCopy = copy[language]

  const fullAddress: string = `${address || ''}${
    address_2 ? `, ${address_2}` : ''
  }`
  const cityStateZip: string = `${city || ''} ${state || ''}${
    `${city || state ? ', ' : ''}${zip}` || ''
  }`

  const baseUrl: string = 'https://www.google.com/maps'
  const addressForUrl: string = `${fullAddress}+${cityStateZip}`.replace(
    /\s/g,
    '+',
  )
  const hrefToGoogleMaps: string = coords?.isInSBCounty
    ? `/dir/?api=1&origin=${coords.latitude},${coords.longitude}&destination=${addressForUrl}`
    : `/place/${addressForUrl}`

  return (
    <Card className={styles.LocationRecordDisplay}>
      {name && (
        <Paragraph size="heading-text" className={styles.heading}>
          {name}
        </Paragraph>
      )}
      {notes && (
        <Paragraph className={styles.Notes} size="med-text">
          {notes}
        </Paragraph>
      )}
      {address && (
        <>
          <Paragraph size="med-text">
            <strong>{activeCopy.address}: </strong>
            {fullAddress}, {cityStateZip}
            <SendText
              id={id}
              org_name={org_name}
              fullAddress={fullAddress}
              cityStateZip={cityStateZip}
            />
            <Paragraph size="med-text" className={styles.Link}>
              <a
                href={`${baseUrl}${hrefToGoogleMaps}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {activeCopy.find}
              </a>
            </Paragraph>
          </Paragraph>
        </>
      )}
      {phone && (
        <>
          <Paragraph size="med-text">
            <strong>{activeCopy.phone}: </strong>
            {phone}
            <Paragraph size="med-text" className={styles.Link}>
              <a href={`tel:${phone.replace(/[^0-9]/g, '')}`}>
                {activeCopy.call}
              </a>
            </Paragraph>
          </Paragraph>
        </>
      )}
      {website && (
        <>
          <Paragraph size="med-text">
            <strong>{activeCopy.locationSite}: </strong>
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </Paragraph>
        </>
      )}
      {services && (
        <>
          <Paragraph size="med-text">
            <strong>{activeCopy.services}: </strong>
            {services}
          </Paragraph>
        </>
      )}
      {email && (
        <Paragraph size="med-text">
          <strong>{activeCopy.email}: </strong>
          <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
            {email}
          </a>
        </Paragraph>
      )}
      {Boolean(schedule.length) && (
        <>
          <Paragraph size="med-text">
            <strong>{activeCopy.schedule}: </strong>
          </Paragraph>
          {schedule.map((scheduleInfo, i) => (
            <ScheduleRecordDisplay key={i} scheduleInfo={scheduleInfo} />
          ))}
        </>
      )}
    </Card>
  )
}

export default LocationRecordDisplay
