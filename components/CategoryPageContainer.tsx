import { useState, useEffect } from 'react'

import { DisplayMap, RecordPane } from './'
import { LocationRecord, OrgRecord } from '../types/records'
import useMultipleListRecords from '../hooks/useMultipleListRecords'

interface CategoryPageContainerProps {
  category: string
}

const CategoryPageContainer = ({ category }: CategoryPageContainerProps) => {
  const lowCategory: string = category.toLowerCase()

  const { fetchedRecords, setFetchedRecords } = useMultipleListRecords(
    lowCategory,
  )

  const [convertedLocRecords, setConvertedLocRecords] = useState<
    LocationRecord[] | null
  >(null)

  useEffect((): void => {
    if (fetchedRecords) {
      const mappedLocRecords: LocationRecord[] = fetchedRecords.records.reduce(
        (arr: LocationRecord[], record: OrgRecord) => {
          const longCheck: number[] = record.fields.location_longitude

          if (longCheck) {
            const newLocationRecords = longCheck.map(
              (longitude: number, i: number) => ({
                category: fetchedRecords.category,
                longitude,
                latitude: record.fields.location_latitude[i],
                name: record.fields.org_name,
                uuid: record.id,
              }),
            )
            arr = [...arr, ...newLocationRecords]
          }

          return arr
        },
        [],
      )
      setConvertedLocRecords(mappedLocRecords)
    }
  }, [fetchedRecords])

  return (
    <>
      <RecordPane
        orgInfo={fetchedRecords}
        category={category}
        setRecords={setFetchedRecords}
      />

      <DisplayMap latLongInfo={convertedLocRecords} page="search" />
    </>
  )
}

export default CategoryPageContainer
