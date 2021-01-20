import Head from 'next/head'

import { RecordPane } from '../../components'

const medicalSupport: string = 'Medical Support'

const MedicalSupport = () => (
  <>
    <Head>
      <title>{`Santa Barbara Reentry | ${medicalSupport}`}</title>
    </Head>
    <RecordPane category={medicalSupport} landingPage />
  </>
)

export default MedicalSupport
