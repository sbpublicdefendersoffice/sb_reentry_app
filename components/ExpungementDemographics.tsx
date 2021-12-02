import { ChangeEvent } from 'react'

import { CopyHolder, ExpungementInfo } from '../types'
import { Paragraph, Input, Card } from '../ui'
import { useLanguage } from '../hooks'

import styles from './ExpungementForm.module.css'

const copy: CopyHolder = {
  english: {
    race: 'What is your race / ethnicity?',
    indOrAl: 'American Indian or Alaskan Native',
    black: 'Black or African American',
    islander: 'Native Hawaiian or Pacific Islander',
    asian: 'Asian',
    hispanic: 'Hispanic / Latinx',
    white: 'White / Caucasian',
    eastOrAf: 'Middle Eastern / North African',
    difRace: 'Different Race, Please State:',
    decline: 'Decline to state',
    gender: 'What gender do you identify as?',
    female: 'Female',
    male: 'Male',
    transFem: 'Transgender Female',
    transMas: 'Transgender Male',
    nonBin: 'Non-Binary',
    difIdent: 'Different Identity, Please State:',
    pronouns: 'What pronouns do you use?',
    she: 'She / her / hers',
    he: 'He / him / his',
    they: 'They / them / theirs',
    difPro: 'Different Pronouns, Please State:',
    ethnicCollect:
      "The Public Defender's Office collects this information to better understand the ethnic makeup of the folks we serve",
    genderCollect:
      "The Public Defender's Office collects this information to better understand the gender makeup of the folks we serve",
    pronounCollect:
      'We strive to treat every person we serve with respect and empathy. A key component of that is knowing how you would like to be addressed.',
  },
  spanish: {
    race: '¿Cuál es su raza / etnia?',
    indOrAl: 'Indio americano o nativo de Alaska',
    black: 'Negro o afroamericano',
    islander: 'Nativo hawaiano o isleño del Pacífico',
    asian: 'Asiático',
    hispanic: 'Hispano / latinx',
    white: 'Blanco / caucásico',
    eastOrAf: 'Medio Oriente / África del Norte',
    difRace: 'Raza diferente, por favor indique:',
    decline: 'Decline to state',
    gender: '¿Con que genero te identificas?',
    female: 'Mujer',
    male: 'Masculino',
    transFem: 'Mujer transgénero',
    transMas: 'Hombre transgénero',
    nonBin: 'Non-Binary',
    difIdent: 'Identidad diferente, indique:',
    pronouns: '¿Qué pronombres usas?',
    she: 'Ella / ella / ella',
    he: 'El / el / su',
    they: 'Ellos / ellos / ellos',
    difPro: 'Diferentes pronombres, por favor diga:',
    ethnicCollect:
      'La Oficina del Defensor Público recopila esta información para comprender mejor la composición étnica de las personas a las que servimos.',
    genderCollect:
      'La Oficina del Defensor Público recopila esta información para comprender mejor la composición de género de las personas a las que servimos.',
    pronounCollect:
      'Nos esforzamos por tratar a todas las personas a las que servimos con respeto y empatía. Un componente clave de eso es saber cómo le gustaría que le abordaran.',
  },
}

interface ExpungementDemographicsProps {
  expungeInfo: ExpungementInfo
  handleChange: ({
    target, // eslint-disable-line no-unused-vars
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const ExpungementDemographics = ({
  expungeInfo,
  handleChange,
}: ExpungementDemographicsProps) => {
  const { language } = useLanguage()
  const {
    race,
    indOrAl,
    black,
    islander,
    asian,
    hispanic,
    white,
    eastOrAf,
    difRace,
    decline,
    gender,
    female,
    male,
    transFem,
    transMas,
    nonBin,
    difIdent,
    pronouns,
    she,
    he,
    they,
    difPro,
    ethnicCollect,
    genderCollect,
    pronounCollect,
  } = copy[language]

  return (
    <>
      <section className={styles.Field}>
        <label id="race-label">{race}</label>
        <Paragraph color="deselected">{ethnicCollect}</Paragraph>
        <Card id="race-card" className={styles.RadioCard}>
          <label htmlFor="indianOrAlaskan">{indOrAl}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="indianOrAlaskan"
            name="Race"
            value="_American Indian or Alaskan_On"
          />
          <label htmlFor="black">{black}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="black"
            name="Race"
            value="_Black or African American_On"
          />
          <label htmlFor="islander">{islander}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="islander"
            name="Race"
            value="_Native Hawaiian or Pacific Islander_On"
          />
          <label htmlFor="asian">{asian}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="asian"
            name="Race"
            value="_Asian_On"
          />
          <label htmlFor="hispanic">{hispanic}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="hispanic"
            name="Race"
            value="_HispanicLatinx_On"
          />
          <label htmlFor="white">{white}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="white"
            name="Race"
            value="_White_On"
          />
          <label htmlFor="eastOrAf">{eastOrAf}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="eastOrAf"
            name="Race"
            value="_Middle EasternNorth African_On"
          />
          <label htmlFor="eastOrAf">{eastOrAf}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="eastOrAf"
            name="Race"
            value="_Middle EasternNorth African_On"
          />
          <label htmlFor="declineRace">{decline}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="declineRace"
            name="Race"
            value="_Decline_Race_On"
          />
          <label htmlFor="difRace">{difRace}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="difRace"
            name="Race"
            value="_Different race_On"
          />
          {expungeInfo?.Race === '_Different race_On' && (
            <Input
              onChange={handleChange}
              type="text"
              id="Different Race Please State-0"
            />
          )}
        </Card>
      </section>
      <section className={styles.Field}>
        <label id="gender-label">{gender}</label>
        <Paragraph color="deselected">{genderCollect}</Paragraph>
        <Card id="gender-card" className={styles.RadioCard}>
          <label htmlFor="female">{female}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="female"
            name="Gender"
            value="_Female_On"
          />
          <label htmlFor="male">{male}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="male"
            name="Gender"
            value="_Male_On"
          />
          <label htmlFor="transFem">{transFem}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="transFem"
            name="Gender"
            value="_Trans_Female_On"
          />
          <label htmlFor="transMas">{transMas}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="transMas"
            name="Gender"
            value="_Trans_Male_On"
          />
          <label htmlFor="nonBin">{nonBin}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="nonBin"
            name="Gender"
            value="_Non_Binary_On"
          />
          <label htmlFor="declineIdent">{decline}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="declineIdent"
            name="Gender"
            value="_Decline_Identity_On"
          />
          <label htmlFor="difIdent">{difIdent}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="difIdent"
            name="Gender"
            value="_Different_Identity_On"
          />
          {expungeInfo?.Gender === '_Different_Identity_On' && (
            <Input
              onChange={handleChange}
              type="text"
              id="Different Identity Please State-0"
            />
          )}
        </Card>
      </section>
      <section className={styles.Field}>
        <label id="pronouns-label">{pronouns}</label>
        <Paragraph color="deselected">{pronounCollect}</Paragraph>
        <Card id="pronouns-card" className={styles.RadioCard}>
          <label htmlFor="she">{she}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="she"
            name="Pronouns"
            value="_She_her_On"
          />
          <label htmlFor="he">{he}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="he"
            name="Pronouns"
            value="_He-him_On"
          />
          <label htmlFor="they">{they}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="they"
            name="Pronouns"
            value="_They_them_On"
          />
          <label htmlFor="declinePro">{decline}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="declinePro"
            name="Pronouns"
            value="_Decline_Pronouns_On"
          />
          <label htmlFor="difPro">{difPro}</label>
          <Input
            onChange={handleChange}
            type="radio"
            id="difPro"
            name="Pronouns"
            value="_Different_Pronouns_On"
          />
          {expungeInfo?.Pronouns === '_Different_Pronouns_On' && (
            <Input
              onChange={handleChange}
              type="text"
              id="Different Pronouns Please State-0"
            />
          )}
        </Card>
      </section>
    </>
  )
}

export default ExpungementDemographics
