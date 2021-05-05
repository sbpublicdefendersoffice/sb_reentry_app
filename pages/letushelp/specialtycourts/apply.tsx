import ApplyForService from '../../../components/ApplyForService'
import { CopyHolder } from '../../../types/language'
import useLanguage from '../../../hooks/useLanguage'

export const copy: CopyHolder = {
  english: {
    apply:
      "Got it! The first step toward qualifying for Specialty Courts is to apply with the Public Defender's office.",
    learn: 'Want to learn more about Specialty Courts?',
  },
  spanish: {
    apply:
      '¡Entendido! El primer paso para calificar para los Tribunales de Especialidades es presentar una solicitud en la oficina del Defensor Público.',
    learn:
      '¿Quiere obtener más información sobre los tribunales especializados?',
  },
}

export const route: string = 'specialtycourts'

const ApplyForSpecialtyCourtsLanding = () => {
  const { language } = useLanguage()
  const parentCopy = copy[language]

  return <ApplyForService parentCopy={parentCopy} route={route} />
}
export default ApplyForSpecialtyCourtsLanding
