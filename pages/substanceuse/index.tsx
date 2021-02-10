import Head from 'next/head'

import { RecordPane } from '../../components'

const substanceUse: string = 'Substance Use'

const SubstanceUse = () => (
  <>
    <Head>
      <title>{`Santa Barbara Reentry | ${substanceUse}`}</title>
    </Head>
    <RecordPane category={substanceUse} />
  </>
)

export default SubstanceUse
