import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { Header } from '../../components'
import { Button, PublicPage, RecordListing } from '../../ui'

import { OrgRecord } from '../../types/records'
import { fetchRecordsByCategory } from '../../services/GET'

const substanceUse = 'Substance Use'

const SubstanceUse = () => {
  const [fetchedRecords, setFetchedRecords] = useState<OrgRecord[] | null>(null)

  useEffect((): void => {
    fetchRecordsByCategory(substanceUse.toLowerCase(), setFetchedRecords)
  }, [])

  const { back, push } = useRouter()

  return (
    <>
      <Head>
        <title>{substanceUse}</title>
      </Head>
      <Header />
      <PublicPage>
        <h2>{substanceUse}</h2>
        <Button block onClick={back}>
          Back
        </Button>
        {Boolean(fetchedRecords?.length) &&
          fetchedRecords.map(record => (
            <RecordListing
              key={record.id}
              title={record.id}
              onClick={e =>
                // @ts-ignore
                push('/substanceuse/[id]', `/substanceuse/${e.target.title}`)
              }
            >
              {record.fields.org_name}
            </RecordListing>
          ))}
      </PublicPage>
    </>
  )
}

export default SubstanceUse
