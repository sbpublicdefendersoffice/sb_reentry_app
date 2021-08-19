import { useState, useEffect } from 'react'

import useLanguage from './useLanguage'

import { POST } from '../helpers/validators'
import { PGOrganizationResponse } from '../types/postgresRecords'

const useMultipleListRecords = (category: string) => {
  const { language } = useLanguage()

  const [fetchedRecords, setFetchedRecords] =
    useState<PGOrganizationResponse[] | null>(null)

  useEffect(() => {
    const multipleRecordsFetch = async () => {
      if (category && language) {
        const apiRequest = await fetch('/api/getByCategory', {
          method: POST,
          body: JSON.stringify({ category, language }),
        })

        const apiResponse: PGOrganizationResponse[] = await apiRequest
          .json()
          .then((orgs: PGOrganizationResponse[]) =>
            orgs.map((org: PGOrganizationResponse) => ({
              ...org,
              single_category: category,
            })),
          )

        setFetchedRecords(apiResponse)
      }
    }
    multipleRecordsFetch()
  }, [category, language])

  return { fetchedRecords, setFetchedRecords }
}

export default useMultipleListRecords
