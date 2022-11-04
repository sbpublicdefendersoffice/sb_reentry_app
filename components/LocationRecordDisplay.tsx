import { Card, Paragraph } from '../ui'

import SendText from './SendText'
import ScheduleRecordDisplay from './ScheduleRecordDisplay'
import { googleCustomClick } from '../helpers/analytics'
import { CopyHolder, PGScheduleRecord, PGServiceRecord } from '../types'
import { useLanguage, useLocation } from '../hooks'
import { isProd } from '../constants/env'

import styles from './LocationRecordDisplay.module.css'

interface LocationRecordDisplayProps {
  id: string
  org_name?: string
  services?: PGServiceRecord[]
  schedules?: PGScheduleRecord[]
  name?: string
  address?: string
  address_2?: string
  city?: string
  state?: string
  zip?: number
  phone?: string
  website?: string
  email?: string
  notes?: string
}

export const copy: CopyHolder = {
  english: {
    address: 'Address',
    find: 'Get Directions On Google Maps',
    phone: 'Phone #',
    call: 'Click to call',
    locationSite: 'Location Website',
    email: 'Email',
    services: 'Services Offered',
    schedule: 'Schedule',
  },
  spanish: {
    address: 'Dirección',
    find: 'Obtener direcciones en Google Maps',
    phone: 'Teléfono #',
    call: 'Haz clic para llamar',
    locationSite: 'Ubicación Página Web',
    email: 'Correo',
    services: 'Servicios Ofrecidos',
    schedule: 'Calendario',
  },
}

const LocationRecordDisplay = ({
  schedules,
  services,
  name,
  address,
  address_2,
  city,
  state,
  zip,
  phone,
  website,
  email,
  notes,
  id,
  org_name,
}: LocationRecordDisplayProps) => {
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
    <Card role="list" className={styles.LocationRecordDisplay}>
      {name && (
        <Paragraph
          role="listitem"
          size="heading-text"
          className={styles.heading}
        >
          {name}
        </Paragraph>
      )}
      {notes && (
        <Paragraph role="listitem" className={styles.Notes} size="med-text">
          {notes}
        </Paragraph>
      )}
      {address && (
        <div className={styles.Address}>
          {/* <Paragraph role="listitem" size="med-text"> */}
          {/* <strong role="note">{activeCopy.address}: </strong> */}
          {/* {fullAddress},<br /> {cityStateZip} */}
          {/* <SendText
              id={id}
              org_name={org_name}
              fullAddress={fullAddress}
              cityStateZip={cityStateZip}
            /> */}
          <img className={styles.AddressIcon} src={'/icons/home.svg'}></img>
          <Paragraph size="med-text" className={styles.Link}>
            <a
              role="note"
              href={`${baseUrl}${hrefToGoogleMaps}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                isProd && googleCustomClick({ used_google_maps: true })
              }
            >
              {fullAddress}
              <br /> {cityStateZip}
              {/* {activeCopy.find} */}
            </a>
          </Paragraph>
          {/* </Paragraph> */}
        </div>
      )}
      {phone && (
        <div className={styles.Phone}>
          <img className={styles.PhoneIcon} src={'/icons/phoneFill.svg'}></img>
          {/* <Paragraph role="listitem" size="med-text">
            <strong role="note">{activeCopy.phone}: </strong>
            {phone} */}
          <Paragraph size="med-text" className={styles.Link}>
            <a role="note" href={`tel:${phone.replace(/[^0-9]/g, '')}`}>
              {phone}
            </a>
            {/* </Paragraph> */}
          </Paragraph>
        </div>
      )}
      {website && (
        <div className={styles.Website}>
          <img className={styles.WebsiteIcon} src={'/icons/website.svg'}></img>
          <Paragraph role="listitem" size="med-text" className={styles.Link}>
            {/* <strong role="note">{activeCopy.locationSite}: </strong> */}
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </Paragraph>
        </div>
      )}
      {Boolean(services?.length) && (
        <>
          <Paragraph role="listitem" size="med-text">
            <strong role="note">{activeCopy.services}: </strong>
            {services.reduce(
              (str, record, i) =>
                (str += `${record[`name_${language}`]}${
                  i !== services.length - 1 ? ', ' : ''
                }`),
              '',
            )}
          </Paragraph>
        </>
      )}
      {email && (
        <Paragraph role="listitem" size="med-text">
          <strong role="note">{activeCopy.email}: </strong>
          <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
            {email}
          </a>
        </Paragraph>
      )}
      {Boolean(schedules?.length) && (
        <>
          <Paragraph role="listitem" size="med-text">
            <strong role="note">{activeCopy.schedule}: </strong>
          </Paragraph>
          {schedules.map((scheduleInfo, i) => (
            <ScheduleRecordDisplay key={i} {...scheduleInfo} />
          ))}
        </>
      )}
    </Card>
  )
}

export default LocationRecordDisplay
