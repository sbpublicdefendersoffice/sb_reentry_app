import useLanguage from '../../../hooks/useLanguage'
import type { CopyHolder } from '../../../types/'
import { Paragraph } from '../../../ui'
import styles from './FreshStartServices.module.css'

const copy: CopyHolder = {
  english: {
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

const FreshStartServices = () => {
  const { language } = useLanguage()
  const {
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
    <div className={styles.Services}>
      <Paragraph size="large-text">Post Conviction Services</Paragraph>
      <br />
      <ul className={styles.List}>
        <div className={styles.Column}>
          <li>
            <Paragraph size="med-text">{list1}</Paragraph>
          </li>
          <li>
            <Paragraph size="med-text">{list2}</Paragraph>
          </li>
          <li>
            <Paragraph size="med-text">{list3}</Paragraph>
          </li>
          <li>
            <Paragraph size="med-text">{list4}</Paragraph>
          </li>
          <li>
            <Paragraph size="med-text">{list5}</Paragraph>
          </li>
          <li>
            <Paragraph size="med-text">{list6}</Paragraph>
          </li>
          <li>
            <Paragraph size="med-text">{list7}</Paragraph>
          </li>
        </div>
        <div className={styles.Column}>
          <li>
            <Paragraph size="med-text">{list8}</Paragraph>
          </li>
          <li>
            <Paragraph size="med-text">{list9}</Paragraph>
          </li>
          <li>
            <Paragraph size="med-text">{list10}</Paragraph>
          </li>
          <li>
            <Paragraph size="med-text">{list11}</Paragraph>
          </li>
          <li>
            <Paragraph size="med-text">{list12}</Paragraph>
          </li>
          <li>
            <Paragraph size="med-text">{list13}</Paragraph>
          </li>
        </div>
      </ul>
      <br />
    </div>
  )
}

export default FreshStartServices
