import { useRouter } from 'next/router'
import Error from 'next/error'

import { applicationPageData } from '../../../constants/copy'
import ApplyForService from '../../../components/ApplyForService'
import useLanguage from '../../../hooks/useLanguage'

const ApplyForServicesLanding = () => {
  const { wildcard } = useRouter().query
  const { language } = useLanguage()

  const route: string = wildcard as string
  const routeData = applicationPageData[route]

  if (!routeData) return <Error statusCode={404} />
  else return <ApplyForService parentCopy={routeData[language]} route={route} />
}

export default ApplyForServicesLanding
