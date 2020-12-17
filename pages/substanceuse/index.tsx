import Head from 'next/head'

import { RecordPane } from '../../components'

const substanceUse: string = 'Substance Use'

const SubstanceUse = () => (
  <>
    <Head>
      <title>{substanceUse}</title>
    </Head>
    <RecordPane category={substanceUse} landingPage />
  </>
)

export default SubstanceUse
