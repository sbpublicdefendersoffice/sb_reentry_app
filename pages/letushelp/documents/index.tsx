import useLanguage from '../../../hooks/useLanguage'
import { CopyHolder } from '../../../types/language'
import {
  LetUsHelpIndexTitle,
  LetUsHelpHeading,
  PictureWithOval,
} from '../../../components'
import { Title, Paragraph } from '../../../ui'
import { flexFullWidth } from '../../../constants/styling'

export const src: string = '/icons/documents.svg'

const copy: CopyHolder = {
  english: {
    whatIs: 'Some of the most important documents include:',
    multExplain: [
      'Birth Certificate',
      'Social Security Card',
      "ID Card or Driver's License",
      'Green Card or Immigration Status Documentaton',
      '*Many of these may have associated fees, but waivers are often available',
    ],
    documents: 'Documents You Might Need',
    access:
      'We advise you to obtain these documents as soon as possible. They may be required to gain access to the resources you need.',
  },
  spanish: {
    whatIs: 'Algunos de los documentos más importantes incluyen:',
    multExplain: [
      'Certificado de nacimiento',
      'Tarjeta de seguro Social',
      'Tarjeta de identificación o licencia de conducir',
      'Documentación de tarjeta verde o estado de inmigración',
      '*Muchos de estos pueden tener tarifas asociadas, pero las exenciones a menudo están disponibles',
    ],
    documents: 'Documentos que puede necesitar',
    access:
      'Le recomendamos que obtenga estos documentos lo antes posible. Es posible que sean necesarios para obtener acceso a los recursos que necesita.',
  },
}

const DocumentsLanding = () => {
  const { language } = useLanguage()

  const { whatIs, multExplain, documents, access } = copy[language]

  return (
    <>
      <div style={flexFullWidth}>
        <PictureWithOval color="green" pic="documents_placeholder.png" />
        <LetUsHelpHeading>
          <Title>{documents}</Title>
          <Paragraph size="med-text">{access}</Paragraph>
        </LetUsHelpHeading>
      </div>
      <LetUsHelpIndexTitle {...{ src, whatIs, multExplain }} />
    </>
  )
}

export default DocumentsLanding
