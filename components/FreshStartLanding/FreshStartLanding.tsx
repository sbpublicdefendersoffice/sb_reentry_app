import useLanguage from '../../hooks/useLanguage'
import type { CopyHolder } from '../../types/'
import picture from '../../public/images/Jill-Stanton.jpg'
import { Paragraph, Title } from '../../ui'
import LetUsHelpHeading from '../LetUsHelpHeading'
import PictureWithOval from '../PictureWithOval'
import FreshStartHowToApply from './FreshStartHowToApply/FreshStartHowToApply'
import styles from './FreshStartLanding.module.css'
import FreshStartServices from './FreshStartServices/FreshStartServices'

const copy: CopyHolder = {
  english: {
    pageTitle: 'Fresh Start',
    info1: `A criminal record can make finding employment, obtaining housing, enrolling in and funding an education, and obtaining/retaining legal permanent residence or citizenship status very difficult.`,
    info2: `The good news is that there are options for you to move forward, even if you have made mistakes in the past, and the Public Defender’s Office would be happy to help you get off to a Fresh Start! Our staff will review your criminal history and seek all appropriate methods of relief for you.`,
    info3: `In order to best advise you on your record relief options, we will obtain a copy of your California Department of Justice Criminal History Report and potentially other court records on your behalf at no cost to you.`,
  },
  spanish: {
    pageTitle: 'Nuevo Comienzo',
    info1: `Un registro de antecedentes penales puede hacer encontrar empleo, obtención de vivienda, matricularse y financiar una educación, y obteniendo/conservar la residencia permanente legal o estado de ciudadanía muy difícil.`,
    info2: `Las buena noticia es que hay opciones para que sigas adelante, aunque hayas cometido errores en el pasado, y la Oficina del Defensor Público estará encantados de ayudarlo a tener un Nuevo Comienzo. Nuestro personal revisara su historial criminal y busque todos los métodos apropiados de alivio para usted.`,
    info3: `Para poder asesorarte mejor sobre sus opciones de alivio de registros, obtendremos una copia de su Informe de antecedentes penales del Departamento de Justicia de California y potencialmente otros registros judiciales en su nombre sin costo alguno para usted.`,
  },
}

const FreshStartLanding = () => {
  const { language } = useLanguage()
  const { pageTitle, info1, info2, info3 } = copy[language]
  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <Title className={styles.HeaderText}>{pageTitle}</Title>
      </div>
      <div className={styles.Info}>
        <Paragraph size="med-text">{info1}</Paragraph>
        <br />
        <Paragraph size="med-text">{info2}</Paragraph>
        <br />
        <Paragraph size="med-text">{info3}</Paragraph>
      </div>
      <FreshStartHowToApply></FreshStartHowToApply>
      <FreshStartServices></FreshStartServices>
    </div>
  )
}

export default FreshStartLanding
