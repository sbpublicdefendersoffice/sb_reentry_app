import { useState, useCallback, useEffect, ChangeEvent } from 'react'
import debounce from 'lodash/debounce'

import useLanguage from '../hooks/useLanguage'

import Tooltip from './Tooltip'
import { Input, Paragraph } from '../ui'
import { POST } from '../helpers/validators'
import { searchCopy } from '../constants/copy'
import { OrgRecord, TranslatedRecordResponse } from '../types/records'

import styles from './LiveDataSearch.module.css'

const delayTimeInMs: number = 500

const LiveDataSearch = () => {
  const { language } = useLanguage()
  const activeCopy = searchCopy[language]

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<OrgRecord[] | null>(null)

  const sendQuery = async (): Promise<void> => {
    if (searchQuery) {
      const call: Response = await fetch('/api/airtablerecordsbykeyword', {
        method: POST,
        body: JSON.stringify({
          searchQuery: searchQuery.toLowerCase(),
          language,
        }),
      })

      const response: TranslatedRecordResponse = await call.json()
      setSearchResults(response.records)
    }
  }

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { value } = target
    setSearchQuery(value)
  }

  const delayedQuery = useCallback(debounce(sendQuery, delayTimeInMs), [
    searchQuery,
  ])

  useEffect(() => {
    delayedQuery()
    return delayedQuery.cancel
  }, [searchQuery, delayedQuery])

  return (
    <div className={styles.LiveDataSearch}>
      <div className={styles.SearchAndResultsContainer}>
        <div className={styles.SearchContainer}>
          <Input
            className={styles.Input}
            value={searchQuery}
            onChange={handleChange}
            placeholder={activeCopy.search}
            role="search"
          />
          <span className={styles.SearchIcon}>&#128269;</span>
          <Tooltip>{activeCopy.tooltip}</Tooltip>
        </div>
        <ul className={styles.ResultsContainer}>
          {searchQuery &&
            searchResults &&
            searchResults.map((record: OrgRecord, i: number) => (
              <li
                className={styles.Result}
                onClick={() => console.log(record.id)}
                key={i}
                tabIndex={0}
              >
                <Paragraph size="med-text">
                  {record.fields.org_name || record.fields.org_name_spanish}
                </Paragraph>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default LiveDataSearch
