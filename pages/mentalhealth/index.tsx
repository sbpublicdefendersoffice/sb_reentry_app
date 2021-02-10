import Head from 'next/head'

import { RecordPane } from '../../components'

const mentalHealth: string = 'Mental Health'

const MentalHealth = () => (
  <>
    <Head>
      <title>{`Santa Barbara Reentry | ${mentalHealth}`}</title>
    </Head>
    <RecordPane category={mentalHealth} />
  </>
)

export default MentalHealth
