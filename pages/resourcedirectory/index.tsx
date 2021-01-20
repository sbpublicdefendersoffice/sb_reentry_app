import Head from 'next/head'

import { RecordPane } from '../../components'

const resourceDirectory: string = 'Resource Directory'

const ResourceDirectory = () => (
  <>
    <Head>
      <title>{`Santa Barbara Reentry | ${resourceDirectory}`}</title>
    </Head>
    <RecordPane category={resourceDirectory} landingPage />
  </>
)

export default ResourceDirectory
