import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { OrgRecord } from '../../types/records'

import { fetchRecordsByCategory } from '../../services/GET'
import Button from '../../ui/Button'

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
      <span>Important information about {substanceUse}</span>
      {Boolean(fetchedRecords?.length) &&
        fetchedRecords.map(record => (
          <p
            key={record.id}
            id={record.id}
            onClick={e =>
              // @ts-ignore
              push('/substanceuse/[id]', `/substanceuse/${e.target.id}`)
            }
            style={{ cursor: 'pointer' }}
          >
            {record.fields.org_name}
          </p>
        ))}
      <Button block onClickFunc={() => back()}>
        Back
      </Button>
    </>
  )
}

export default SubstanceUse
