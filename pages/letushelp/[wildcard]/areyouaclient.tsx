import { useRouter } from 'next/router'

import { AreYouAClient, HeadTags } from '../../../components/'
import { siteTitle } from '../../../constants'
import { CopyHolder } from '../../../types'
import { useLanguage } from '../../../hooks'

const copy: CopyHolder = {
  english: { title: 'Are You A Client?' },
  spanish: { title: '¿Eres cliente?' },
}

const AreYouAClientLanding = () => {
  const { query } = useRouter()
  const { language } = useLanguage()

  const route: string = query.wildcard as string
  const { title } = copy[language]

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${title}`}
        href={`/letushelp/${route}/areyouaclient`}
      />
      <AreYouAClient route={route} />
    </>
  )
}

export default AreYouAClientLanding
