import Head from 'next/head'

import { RecordPane } from '../../components'

const food: string = 'Food'

const Food = () => (
  <>
    <Head>
      <title>{`Santa Barbara Reentry | ${food}`}</title>
    </Head>
    <RecordPane category={food} landingPage />
  </>
)

export default Food
