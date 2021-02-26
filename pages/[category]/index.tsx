import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'

import useLanguage from '../../hooks/useLanguage'

import { siteTitle } from '../../constants/copy'
import { CategoryPageContainer } from '../../components'
import categories from '../../constants/categories'

const LandingPage = () => {
  const { asPath } = useRouter()
  const { language } = useLanguage()

  const validCategory = categories[asPath]

  if (!validCategory) return <Error statusCode={404} />

  const displayCategory: string = validCategory[language].category
  const routeCategory: string = validCategory.english.category

  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${displayCategory}`}</title>
      </Head>
      <CategoryPageContainer
        displayCategory={displayCategory}
        routeCategory={routeCategory}
      />
    </>
  )
}

export default LandingPage
