import ApplyForService from '../../../components/ApplyForService'
import { CopyHolder } from '../../../types/language'
import useLanguage from '../../../hooks/useLanguage'

export const copy: CopyHolder = {
  english: {
    apply:
      "Got it! Before you can be eligible for diversion services, you need to apply with the Public Defender's office",
    learn: 'To learn more about diversion services:',
  },
  spanish: {
    apply:
      '¡Entiendo! Antes de que pueda ser elegible para los servicios de desvío, debe presentar una solicitud en la oficina del Defensor Público',
    learn: 'Para obtener más información sobre los servicios de desvío:',
  },
}

export const route: string = 'diversion'

const ApplyForDiversionLanding = () => {
  const { language } = useLanguage()
  const parentCopy = copy[language]

  return <ApplyForService parentCopy={parentCopy} route={route} />
}

export default ApplyForDiversionLanding
