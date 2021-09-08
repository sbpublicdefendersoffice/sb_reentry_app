// import { useRouter } from 'next/router'

// import { useLanguage } from '../hooks/'
// import { CopyHolder } from '../types/language'
import {
  HomepageMainBanner,
  ResourceHub,
  // PictureWithOval,
  // LetUsHelpHeading,
  UnsureWhereToStart,
} from '../components'
// import { Title, Paragraph, Button } from '../ui'
// import { flexFullWidth } from '../constants/'

// const copy: CopyHolder = {
//   english: {
//     title2: 'Not sure where to start?',
//     explainer2:
//       'So much information can be overwhelming, but there are many routes to take to get help.',
//     buttonText2: 'Let us help',
//   },
//   spanish: {
//     title2: '¿No estás seguro por dónde empezar?',
//     explainer2:
//       'Tanta información puede ser abrumadora, pero hay muchas rutas que puede tomar para obtener ayuda.',
//     buttonText2: 'Ayudemos',
//   },
// }

// export const url2: string = '/letushelp'

const Home = () => {
  // const { push } = useRouter()
  // const { language } = useLanguage()

  // const { title2, explainer2, buttonText2 } = copy[language]

  return (
    <>
      <HomepageMainBanner />
      <ResourceHub />
      <UnsureWhereToStart />
      {/* <div style={{ ...flexFullWidth, textAlign: 'end' }}>
        <LetUsHelpHeading>
          <Title>{title2}</Title>
          <Paragraph style={{ marginBottom: 'var(--margin-lg)' }}>
            {explainer2}
          </Paragraph>
          <Button onClick={() => push(url2, url2)}>{buttonText2}</Button>
        </LetUsHelpHeading>
        <PictureWithOval
          color="green"
          pic="whereToStartPic.jpg"
          shiftRight
          lazy
        />
      </div> */}
    </>
  )
}

export default Home
