import { useRouter } from 'next/router'

import useLanguage from '../hooks/useLanguage'
import { CopyHolder } from '../types/language'
import {
  PwaDownload,
  ResourceHub,
  TopThreeCta,
  PictureWithOval,
  LetUsHelpHeading,
  // AAMeetingsCta,
  // AccessLineCta,
  // AddYourOrg,
  // PRRCcta,
  // LetUsHelpCta,
  // MostUsedResourcesCta,
} from '../components'
import { Title, Paragraph, Button } from '../ui'
import { flexFullWidth } from '../constants/'

const copy: CopyHolder = {
  english: {
    title: 'We help you thrive by providing the tools you need',
    explainer:
      'On ThriveSBC you will find a variety of resources to help you or a loved one with re-entry after a jail or prison stay. We know this is a tough task, and Santa Barbara County is here to help!',
    buttonText: 'See Our Resources To Get Started',
    title2: 'Not sure where to start?',
    explainer2:
      'So much information can be overwhelming, but there are many routes to take to get help.',
    buttonText2: 'Let us help',
  },
  spanish: {
    title:
      'Le ayudamos a prosperar proporcionándole las herramientas que necesita',
    explainer:
      'En ThriveSBC encontrará una variedad de recursos para ayudarlo a usted oa un ser querido con el reingreso después de una estancia en la cárcel o prisión. ¡Sabemos que esta es una tarea difícil y el condado de Santa Bárbara está aquí para ayudar!',
    buttonText: 'Vea nuestros recursos para comenzar',
    title2: '¿No estás seguro por dónde empezar?',
    explainer2:
      'Tanta información puede ser abrumadora, pero hay muchas rutas que puede tomar para obtener ayuda.',
    buttonText2: 'Ayudemos',
  },
}

export const url: string = '/checklist'
export const url2: string = '/letushelp'

const Home = () => {
  const { push } = useRouter()
  const { language } = useLanguage()
  const { title, explainer, buttonText, title2, explainer2, buttonText2 } =
    copy[language]

  return (
    <>
      <div style={flexFullWidth}>
        <PictureWithOval color="peri" pic="homepage_placeholder.png" />
        <LetUsHelpHeading>
          <Title>{title}</Title>
          <Paragraph style={{ marginBottom: 'var(--margin-lg)' }}>
            {explainer}
          </Paragraph>
          <Button light onClick={() => push(url, url)}>
            {buttonText}
          </Button>
        </LetUsHelpHeading>
      </div>
      <ResourceHub />
      <TopThreeCta />
      <div style={{ ...flexFullWidth, textAlign: 'end' }}>
        <LetUsHelpHeading>
          <Title>{title2}</Title>
          <Paragraph style={{ marginBottom: 'var(--margin-lg)' }}>
            {explainer2}
          </Paragraph>
          <Button onClick={() => push(url2, url2)}>{buttonText2}</Button>
        </LetUsHelpHeading>
        <PictureWithOval color="green" pic="wheretostart_placeholder.png" />
      </div>
      <PwaDownload />
      {/* <LetUsHelpCta /> */}
      {/* <MostUsedResourcesCta /> */}
      {/* <PRRCcta /> */}
      {/* <AccessLineCta /> */}
      {/* <AddYourOrg /> */}
      {/* <AAMeetingsCta /> */}
    </>
  )
}

export default Home
