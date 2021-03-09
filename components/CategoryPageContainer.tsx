import { useState, useEffect } from 'react'

import { DisplayMap, RecordPane } from './'
import { filterOutLocationlessRecords } from '../helpers/filters'
import { LocationRecord } from '../types/records'
import useMultipleListRecords from '../hooks/useMultipleListRecords'

interface CategoryPageContainerProps {
  displayCategory: string
  routeCategory: string
}

const CategoryPageContainer = ({
  displayCategory,
  routeCategory,
}: CategoryPageContainerProps) => {
  const lowCategory: string = routeCategory.toLowerCase()

  const { fetchedRecords, setFetchedRecords } = useMultipleListRecords(
    lowCategory,
  )

  const [convertedLocRecords, setConvertedLocRecords] = useState<
    LocationRecord[] | null
  >(null)

  useEffect((): void => {
    if (fetchedRecords) {
      const mappedLocRecords: LocationRecord[] = filterOutLocationlessRecords(
        fetchedRecords,
      )
      setConvertedLocRecords(mappedLocRecords)
    }
  }, [fetchedRecords])

  return (
    <>
      <RecordPane
        orgInfo={fetchedRecords}
        displayCategory={displayCategory}
        routeCategory={routeCategory}
        setRecords={setFetchedRecords}
      />

      <DisplayMap latLongInfo={convertedLocRecords} page="search" />
    </>
  )
}

export default CategoryPageContainer
