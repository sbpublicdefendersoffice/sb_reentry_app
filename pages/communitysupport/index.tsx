import Head from 'next/head'

import { CategoryPageContainer } from '../../components'

const category: string = 'Community Support'

const LandingPage = () => (
  <>
    <Head>
      <title>{`Santa Barbara Reentry | ${category}`}</title>
    </Head>
    <CategoryPageContainer category={category} />
  </>
)

export default LandingPage
