import { useRouter } from 'next/router'

import useLanguage from '../../hooks/useLanguage'

import { OrgPageContainer } from '../../components'

import categories from '../../constants/categories'

const IdPage = () => {
  const { route } = useRouter()
  const { language } = useLanguage()

  const baseRoute: string = route.replace('/[id]', '')

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
