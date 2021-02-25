import { useRouter } from 'next/router'

import useLanguage from '../../hooks/useLanguage'

import { OrgPageContainer, LeafLoader } from '../../components'

import categories from '../../constants/categories'

const IdPage = () => {
  const { asPath } = useRouter()
  const { language } = useLanguage()

  if (asPath.startsWith('/[category]')) return <LeafLoader />

  const captureBaseRoute: RegExp = /^(.*)\/.*$/
  const capturedRouteReference: string = '$1'
  const baseRoute: string = asPath.replace(
    captureBaseRoute,
    capturedRouteReference,
  )

  const displayCategory: string = categories[baseRoute][language].category
  const routeCategory: string = categories[baseRoute].english.category

  return (
    <OrgPageContainer
      displayCategory={displayCategory}
      routeCategory={routeCategory}
    />
  )
}

export default IdPage
