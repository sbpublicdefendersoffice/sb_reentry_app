import { CopyHolder } from '../types/language'
export const legaltermsCopy: CopyHolder = {
  english: {
    title: 'Terms You May Hear',
    description:
      'You might hear these terms while in court. You can always ask your Public Defender, Social Worker or anyone else for further clarification. Here is a great place to start',
  },
  spanish: {
    title: 'Terminos que puede escuchar',
    description:
      'Es posible que escuche estos términos en la corte. Siempre puede pedirle más aclaraciones a su defensor público, trabajador social o cualquier otra persona. Este es un gran lugar para comenzar.',
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
