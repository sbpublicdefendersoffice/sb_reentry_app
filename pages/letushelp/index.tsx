import { siteTitle } from '../../constants'
import { useLanguage } from '../../hooks'
import {
  LetUsHelpContainer,
  LetUsHelpTitle,
  LetUsHelpTiles,
  HeadTags,
} from '../../components'
import { CopyHolder } from '../../types'

const copy: CopyHolder = {
  english: { title: 'Let Us Help' },
  spanish: { title: 'Permítanos ayudar' },
}

const LetUsHelpPage = () => {
  const { language } = useLanguage()
  const { title } = copy[language]

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${title}`}
        href="/letushelp"
        description="ThriveSBC's guided collection of resources to aid you in a successful reentry"
      />

      <LetUsHelpContainer>
        <LetUsHelpTitle />
        <LetUsHelpTiles />
      </LetUsHelpContainer>
    </>
  )
}

export default LetUsHelpPage
