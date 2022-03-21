import type { CopyHolder } from '../types/'
import NextLink from 'next/link'

import useLanguage from '../hooks/useLanguage'
import { Paragraph, Title } from '../ui'

const copy: CopyHolder = {
  english: {
    reduce: 'Reduce or dismiss your record in Santa Barbara county',
    fill: "Fill out one easy form and you'll be connected to the Santa Barbara Public Defender's Office to help with your petitions for record clearance",
    login: 'Login',
    apply: ' and apply today',
    info1: `A criminal record can make finding employment, obtaining housing, enrolling in and funding an education, and obtaining/retaining legal permanent residence or citizenship status very difficult.`,
    info2: `The good news is that there are options for you to move forward, even if you have made mistakes in the past, and the Public Defender’s Office would be happy to help you get off to a Fresh Start! Our staff will review your criminal history and seek all appropriate methods of relief for you.`,
    info3: `In order to best advise you on your record relief options, we will obtain a copy of your California Department of Justice Criminal History Report and potentially other court records on your behalf at no cost to you.`,
    list1: `Expungement (Dismissal) of Criminal Convictions`,
    list2: `Prop. 47 Relief (Reclassifying Certain Low Level Felonies to Misdemeanors)`,
    list3: `Prop. 64 Relief (Reclassifying Certain Marijuana Crimes)`,
    list4: `Motions to Reduce Felony Convictions to Misdemeanors`,
    list5: `Motions for Early Termination of Probation`,
    list6: `Human Trafficking Victim Conviction Relief`,
    list7: `Sealing Adult Arrest Records`,
    list8: `Sealing Adult Arrest Records for the Factually Innocent`,
    list9: `Certificates of Rehabilitation/Gubernatorial Pardons`,
    list10: `Correcting Errors in Department of Justice Criminal History Records`,
    list11: `DNA Database Expungement`,
    list12: `Gang Documentation Relief`,
    list13: `Dismissal Petitions for Successful PC1000 Participants with Collateral Consequences per PC1203.43`,
  },
  spanish: {
    reduce: 'Reducir o descartar su registro en el condado de Santa Bárbara',
    fill: 'Complete un formulario fácil y se conectara con la Oficina del Defensor Publico de Santa Barbara para ayudarlo con sus peticiones de autorización de registros.',
    login: 'Inicie sesión',
    apply: ' y solicite hoy',
    info1: `Un registro de antecedentes penales puede hacer encontrar empleo, obtención de vivienda, matricularse y financiar una educación, y obteniendo/conservar la residencia permanente legal o estado de ciudadanía muy difícil.`,
    info2: `Las buena noticia es que hay opciones para que sigas adelante, aunque hayas cometido errores en el pasado, y la Oficina del Defensor Público estará encantados de ayudarlo a tener un Nuevo Comienzo. Nuestro personal revisara su historial criminal y busque todos los métodos apropiados de alivio para usted.`,
    info3: `Para poder asesorarte mejor sobre sus opciones de alivio de registros, obtendremos una copia de su Informe de antecedentes penales del Departamento de Justicia de California y potencialmente otros registros judiciales en su nombre sin costo alguno para usted.`,
    list1: `Eliminación (Destitución) de condenas penales`,
    list2: `Alivio de la Prop. 47 (Reclasificación de ciertos delitos graves de bajo nivel a delitos menores)`,
    list3: `Alivio de la Prop. 64 (Reclasificación de ciertos delitos relacionados con la marihuana)`,
    list4: `Mociones para reducir las condenas por delitos graves a delitos menores`,
    list5: `Moción para la terminación anticipada de la libertad condicional`,
    list6: `Alivio de condena de victimas de trata de personas`,
    list7: `Sellado de registros de arresto de adultos`,
    list8: `Sellado de registros de arresto de adultos para personas inocentes`,
    list9: `Certificados de Rehabilitación/Indultos de Gobernador`,
    list10: `Corrección de errores en los registros de antecedentes penales de Departamento de Justicia`,
    list11: `Borrado de la base de datos de ADN`,
    list12: `Alivio de documentación de pandillas`,
    list13: `Peticiones de despido para participantes exitosos de PC 1000 con consecuencias colaterales de PC1203.43`,
  },
}

import styles from './FreshStartText.module.css'

const FreshStartText = () => {
  const { language } = useLanguage()

  const {
    info1,
    info2,
    info3,
    fill,
    login,
    apply,
    list1,
    list2,
    list3,
    list4,
    list5,
    list6,
    list7,
    list8,
    list9,
    list10,
    list11,
    list12,
    list13,
  } = copy[language]

  return (
    <div className={styles.FreshStartText}>
      <div className={styles.Title}>Fresh Start</div>
      <Paragraph size="heading-text" className={styles.TextBlock}>
        {info1}
      </Paragraph>
      <Paragraph size="heading-text" className={styles.TextBlock}>
        {info2}
      </Paragraph>
      <Paragraph size="heading-text" className={styles.TextBlock}>
        {info3}
      </Paragraph>
      <div className={styles.List}>
        <ul>
          <li>{list1}</li>
          <li>{list2}</li>
          <li>{list3}</li>
          <li>{list4}</li>
          <li>{list5}</li>
          <li>{list6}</li>
          <li>{list7}</li>
          <li>{list8}</li>
          <li>{list9}</li>
          <li>{list10}</li>
          <li>{list11}</li>
          <li>{list12}</li>
          <li>{list13}</li>
        </ul>
      </div>
      <Paragraph size="heading-text" className={styles.TextBlock}>
        {fill}
      </Paragraph>
      <Paragraph size="heading-text" className={styles.TextBlock}>
        <NextLink href="/login">{login}</NextLink>
        {apply}
      </Paragraph>
    </div>
  )
}

export default FreshStartText
