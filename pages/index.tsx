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
  },
  spanish: {
    title:
      'Le ayudamos a prosperar proporcionándole las herramientas que necesita',
    explainer:
      'En ThriveSBC encontrará una variedad de recursos para ayudarlo a usted oa un ser querido con el reingreso después de una estancia en la cárcel o prisión. ¡Sabemos que esta es una tarea difícil y el condado de Santa Bárbara está aquí para ayudar!',
    buttonText: 'Vea nuestros recursos para comenzar',
  },
}

export const url: string = '/checklist'

const Home = () => {
  const { push } = useRouter()
  const { language } = useLanguage()
  const { title, explainer, buttonText } = copy[language]

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
      {/* <LetUsHelpCta /> */}
      <PwaDownload />
      {/* <MostUsedResourcesCta /> */}
      {/* <PRRCcta /> */}
      {/* <AccessLineCta /> */}
      {/* <AddYourOrg /> */}
      {/* <AAMeetingsCta /> */}
    </>
  )
}

export default Home
