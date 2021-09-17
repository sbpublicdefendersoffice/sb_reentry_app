import { useRouter } from 'next/router'
import Error from 'next/error'

import { applicationPageData, siteTitle } from '../../../constants/'
import { ApplyForService, HeadTags } from '../../../components/'
import useLanguage from '../../../hooks/useLanguage'
import { CopyHolder } from '../../../types'

const copy: CopyHolder = {
  english: { title: 'Apply' },
  spanish: { title: 'Solicitar' },
}

const ApplyForServicesLanding = () => {
  const { wildcard } = useRouter().query
  const { language } = useLanguage()

  const { title } = copy[language]

  const route: string = wildcard as string
  const routeData = applicationPageData[route]

  if (!routeData) return <Error statusCode={404} />
  else
    return (
      <>
        <HeadTags
          title={`${siteTitle} | ${title}`}
          href={`/letushelp/${route}/apply`}
        />
        <ApplyForService parentCopy={routeData[language]} route={route} />
      </>
    )
}

export default ApplyForServicesLanding
