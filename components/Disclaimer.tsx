import { Paragraph } from '../ui'
import { CopyHolder } from '../types/language'
import useLanguage from '../hooks/useLanguage'

const copy: CopyHolder = {
  english: {
    disclaimer: 'Disclaimer of responsibility',
    disclaimerCopy:
      'We make every effort to ensure our information is as up to date and accurate as possible. However, we cannot claim with 100% accuracy that it will be. We recommend that you contact an organization before visiting to make sure all locations/times/requirements etc. listed are accurate.',
  },
  spanish: {
    disclaimer: 'Exención de responsabilidad',
    disclaimerCopy:
      'Hacemos todo lo posible para garantizar que nuestra información esté lo más actualizada y precisa posible. Sin embargo, no podemos afirmar con un 100% de precisión que así sea. Le recomendamos que se ponga en contacto con una organización antes de visitarla para asegurarse de que todas las ubicaciones, horarios, requisitos, etc., sean precisos.',
  },
}

const Disclaimer = () => {
  const { language } = useLanguage()
  const activeCopy = copy[language]

  return (
    <em>
      <Paragraph>
        <strong>{activeCopy.disclaimer}: </strong>
        {activeCopy.disclaimerCopy}
      </Paragraph>
    </em>
  )
}

export default Disclaimer
