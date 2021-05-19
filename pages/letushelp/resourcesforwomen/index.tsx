import { PictureWithOval, LetUsHelpHeading } from '../../../components'
import useLanguage from '../../../hooks/useLanguage'
import { CopyHolder } from '../../../types/language'
import { Title, Paragraph } from '../../../ui'

const copy: CopyHolder = {
  english: {
    title: 'Resources for Cis/Trans Women',
    explainer:
      'Justice involved cisgender women, trans women and gender nonconforming individuals are often overlooked. This can greatly impact their ability to reenter successfully. Below you can find a list of resources that can provide support.',
  },
  spanish: {
    title: 'Recursos para mujeres Cis/Trans',
    explainer:
      'La justicia involucra a mujeres cisgénero, mujeres trans e individuos no conformes con el género a menudo se pasa por alto. Esto puede afectar en gran medida su capacidad para reingresar con éxito. A continuación, puede encontrar una lista de recursos que pueden brindar apoyo.',
  },
}

const ResourcesForWomenLanding = () => {
  const { language } = useLanguage()
  const { title, explainer } = copy[language]

  return (
    <>
      <div style={{ width: '100%', display: 'flex' }}>
        <PictureWithOval
          color="var(--peri)"
          pic="resourcesforwomen_placeholder.png"
        />
        <LetUsHelpHeading>
          <Title>{title}</Title>
          <Paragraph size="med-text">{explainer}</Paragraph>
        </LetUsHelpHeading>
      </div>
    </>
  )
}

export default ResourcesForWomenLanding
