import { useState, useEffect, ReactElement } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { OrgRecordDisplay } from '../../components'
import { Button } from '../../ui'
import { SortedRecord } from '../../types/records'
import { fetchSingleOrgRecord } from '../../services/GET'

const fetchString = 'Fetching Organization Info...'

const IdPage = () => {
  const [
    singleFetchedRecord,
    setSingleFetchedRecord,
  ] = useState<SortedRecord | null>(null)
  const [timeoutBackButton, setTimeoutBackButton] = useState<boolean>(false)
  const { query, back } = useRouter()
  const { id } = query

  useEffect(() => {
    if (id) fetchSingleOrgRecord(String(id), setSingleFetchedRecord)
  }, [id])

  useEffect(() => {
    let buttonTimeout: number
    if (!singleFetchedRecord)
      buttonTimeout = window.setTimeout(() => setTimeoutBackButton(true), 3000)
    return () => window.clearTimeout(buttonTimeout)
  }, [singleFetchedRecord])

  const backButton: ReactElement = <Button onClick={back}>Back</Button>

  return (
    <>
      {singleFetchedRecord ? (
        <>
          <Head>
            <title>{singleFetchedRecord.name}</title>
          </Head>
          {backButton}
          <OrgRecordDisplay singleFetchedRecord={singleFetchedRecord} />
        </>
      ) : (
        <>
          <Head>
            <title>{fetchString}</title>
          </Head>
          {timeoutBackButton && backButton}
          <span>{fetchString}</span>
        </>
      )}
    </>
  )
}

export default IdPage
