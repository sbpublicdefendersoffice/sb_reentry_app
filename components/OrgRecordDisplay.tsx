import { Disclaimer, LocationRecordDisplay } from './'
import { Details, Title } from '../ui'

import useLanguage from '../hooks/useLanguage'
import { SortedRecord, CopyHolder } from '../types'

import styles from './OrgRecordDisplay.module.css'
import { Paragraph } from '../ui'

interface OrgRecordDisplayProps {
  sortedRecord: SortedRecord
}

export const copy: CopyHolder = {
  english: {
    orgInfo: 'Organization Information',
    description: 'Description:',
    thingsToKnow: 'Some Things To Know:',
    website: 'Site:',
    lang: 'Languages Spoken:',
    location: 'Locations:',
  },
  spanish: {
    orgInfo: 'Información de la organización',
    description: 'Descripción:',
    thingsToKnow: 'Algunas cosas para saber:',
    website: 'Sitio:',
    lang: 'Idiomas Hablados:',
    location: 'Ubicaciones:',
  },
}

const OrgRecordDisplay = ({ sortedRecord }: OrgRecordDisplayProps) => {
  const { language } = useLanguage()
  const activeCopy = copy[language]

  const { name, website, languages_spoken, notes, locations } = sortedRecord

  return (
    <div role="menu" className={styles.OrgRecordDisplay}>
      <Details open summary={activeCopy.orgInfo} className={styles.listing}>
        <Title role="heading" className={styles.DisplayTitle}>
          {name}
        </Title>
        {notes && (
          <>
            <Paragraph role="term" size="heading-text">
              {activeCopy.description}
            </Paragraph>
            <Paragraph size="med-text">{notes}</Paragraph>
          </>
        )}
        {website || languages_spoken ? (
          <>
            <Paragraph role="term" size="heading-text">
              {activeCopy.thingsToKnow}
            </Paragraph>
            {website && (
              <Paragraph size="med-text">
                <strong role="term">{activeCopy.website} </strong>
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {website}
                </a>
              </Paragraph>
            )}
            {languages_spoken && (
              <Paragraph size="med-text">
                <strong role="term">{activeCopy.lang} </strong>
                <span>{languages_spoken}</span>
              </Paragraph>
            )}
          </>
        ) : null}
        <Disclaimer />
      </Details>
      {Boolean(locations?.length) && (
        <Details open summary={activeCopy.location}>
          <Paragraph
            role="term"
            className={styles.LocationHeading}
            size="heading-text"
          >
            {activeCopy.location}
          </Paragraph>
          {locations.map((locationInfo, i) => (
            <LocationRecordDisplay
              key={i}
              locationInfo={locationInfo}
              id={String(i)}
            />
          ))}
        </Details>
      )}
    </div>
  )
}

export default OrgRecordDisplay
