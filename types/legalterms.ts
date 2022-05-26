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
      'Ese posible que escuche estos términos mientras esta en la corte. Siempre puedes preguntarle a tu Defensor Público, Trabajador social o alguien mas para mas aclaraciones. Aquí hay un gran lugar para comenzar.',
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
