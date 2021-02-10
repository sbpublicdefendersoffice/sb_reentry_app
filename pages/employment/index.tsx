import Head from 'next/head'

import { RecordPane } from '../../components'

const employment: string = 'Employment'

const Employment = () => (
  <>
    <Head>
      <title>{`Santa Barbara Reentry | ${employment}`}</title>
    </Head>
    <RecordPane category={employment} />
  </>
)

export default Employment
