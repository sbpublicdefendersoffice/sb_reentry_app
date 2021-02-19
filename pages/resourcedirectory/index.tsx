import Head from 'next/head'
import { useRouter } from 'next/router'

import useLanguage from '../../hooks/useLanguage'

import { CategoryPageContainer } from '../../components'
import categories from '../../constants/categories'

const LandingPage = () => {
  const { route } = useRouter()
  const { language } = useLanguage()

  const displayCategory: string = categories[route][language].category
  const routeCategory: string = categories[route].english.category

  return (
    <>
      <Head>
        <title>{`Santa Barbara Reentry | ${displayCategory}`}</title>
      </Head>
      <CategoryPageContainer
        displayCategory={displayCategory}
        routeCategory={routeCategory}
      />
    </>
  )
}

export default LandingPage
