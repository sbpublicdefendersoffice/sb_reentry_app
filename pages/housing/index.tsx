import Head from 'next/head'

import { RecordPane } from '../../components'

const housing: string = 'Housing'

const Housing = () => (
  <>
    <Head>
      <title>{`Santa Barbara Reentry | ${housing}`}</title>
    </Head>
    <RecordPane category={housing} />
  </>
)

export default Housing
