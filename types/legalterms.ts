import { CopyHolder } from '../types/language'
export const legaltermsCopy: CopyHolder = {
  english: {
    title: 'Legal terms you might here',
    description:
      'Click on a term below to better understand some of the frequenlty used legal terms',
  },
  spanish: {
    title: 'Términos legales que puede encontrar aquí',
    description:
      'Haga clic en un término a continuación para comprender mejor algunos de los términos legales que se utilizan con frecuencia.',
  },
}
export interface LegalTerms {
  english: Item
  spanish: Item
}
interface Item {
  title: string
  description: string
}
