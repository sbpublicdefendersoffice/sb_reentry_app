import Head from 'next/head'
import { useRouter } from 'next/router'
import Error from 'next/error'

import { applicationPageData, siteTitle } from '../../../constants/'
import ApplyForService from '../../../components/ApplyForService'
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
        <Head>
          <title>{`${siteTitle} | ${title}`}</title>
        </Head>
        <ApplyForService parentCopy={routeData[language]} route={route} />
      </>
    )
}

export default ApplyForServicesLanding
