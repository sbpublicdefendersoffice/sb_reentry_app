import Head from 'next/head'

import { siteTitle } from '../../constants'
import { useLanguage } from '../../hooks'
import {
  LetUsHelpContainer,
  LetUsHelpTitle,
  LetUsHelpTiles,
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
      <Head>
        <title>{`${siteTitle} | ${title}`}</title>
      </Head>
      <LetUsHelpContainer>
        <LetUsHelpTitle />
        <LetUsHelpTiles />
      </LetUsHelpContainer>
    </>
  )
}

export default LetUsHelpPage
