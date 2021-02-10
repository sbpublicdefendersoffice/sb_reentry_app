import Head from 'next/head'

import { RecordPane } from '../../components'

const clothing: string = 'Clothing'

const Clothing = () => (
  <>
    <Head>
      <title>{`Santa Barbara Reentry | ${clothing}`}</title>
    </Head>
    <RecordPane category={clothing} />
  </>
)

export default Clothing
