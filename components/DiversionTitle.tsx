import { CallToAction, Title, Paragraph } from '../ui'
import { CopyHolder } from '../types/language'
import useLanguage from '../hooks/useLanguage'

const copy: CopyHolder = {
  english: {
    title: 'Diversion',
    whatIs: 'What is Diversion?',
    explain:
      'CREDO-47 is a diversion program that links individuals with substance use  and mental health problems  to treatment and provides assistance  with housing,  jobs, education,  and other resources.  If you are accepted in the program and participate in treatment, you are able to get your criminal case dismissed.',
  },
  spanish: {
    title: 'Diversion',
    whatIs: 'What is Diversion?',
    explain:
      'CREDO-47 es un programa alternativo que vincula a las personas con problemas de salud mental y uso de sustancias con el tratamiento y brinda asistencia con vivienda, trabajo, educación y otros recursos. Si es aceptado en el programa y participa en el tratamiento, puede hacer que se desestime su caso penal.',
  },
}

const DiversionTitle = () => {
  const { language } = useLanguage()

  return <CallToAction blueBg>{/* <Title></Title> */}</CallToAction>
}

export default DiversionTitle
