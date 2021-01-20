import Head from 'next/head'

import { RecordPane } from '../../components'

const legalServices: string = 'Legal Services'

const LegalServices = () => (
  <>
    <Head>
      <title>{`Santa Barbara Reentry | ${legalServices}`}</title>
    </Head>
    <RecordPane category={legalServices} landingPage />
  </>
)

export default LegalServices
