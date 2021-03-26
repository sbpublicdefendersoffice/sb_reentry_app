import {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  FormEvent,
  MouseEvent,
} from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import debounce from 'lodash/debounce'

import useLanguage from '../hooks/useLanguage'

import Tooltip from './Tooltip'

import { Input, Paragraph } from '../ui'
import { POST } from '../helpers/validators'
import { searchCopy } from '../constants/copy'
import useGlobalSearch from '../hooks/useGlobalSearch'
import { OrgRecord, TranslatedRecordResponse } from '../types/records'

import styles from './LiveDataSearch.module.css'

const delayTimeInMs: number = 500

const LiveDataSearch = () => {
  const { push } = useRouter()
  const { language } = useLanguage()
  const activeCopy = searchCopy[language]

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { searchResults, setSearchResults } = useGlobalSearch()

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLSpanElement>,
  ): void => {
    e.preventDefault()
    if (searchQuery) {
      setIsFocused(false)
      push('/search', `/search?query=${searchQuery}`)
    }
  }

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

      setSearchResults(response)
    }
  }

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { value } = target
    setSearchQuery(value)
  }

  const delayedQuery = useCallback(debounce(sendQuery, delayTimeInMs), [
    searchQuery,
  ])

  useEffect((): void => {
    delayedQuery()
    return delayedQuery.cancel
  }, [searchQuery, delayedQuery])

  return (
    <section
      className={styles.LiveDataSearch}
      onFocus={() => setIsFocused(true)}
    >
      <form className={styles.SearchContainer} onSubmit={handleSubmit}>
        <label className={styles.Label} htmlFor="global-search">
          Global Search
        </label>
        <Input
          type="search"
          id="global-search"
          className={styles.Input}
          value={searchQuery}
          onChange={handleChange}
          placeholder={`${activeCopy.search}...`}
          role="search"
        />
        <span className={styles.SearchIcon} onClick={handleSubmit}>
          &#128269;
        </span>
        <Tooltip>{activeCopy.tooltip}</Tooltip>
      </form>
      {searchQuery && searchResults && isFocused && (
        <ul className={styles.ResultsContainer}>
          {searchResults.records.map((record: OrgRecord, i: number) => (
            <li
              className={styles.Result}
              key={i}
              tabIndex={0}
              onClick={() => setIsFocused(false)}
            >
              <NextLink href="/search/[id]" as={`/search/${record.id}`}>
                <Paragraph size="med-text">
                  {record.fields.org_name || record.fields.org_name_spanish}
                </Paragraph>
              </NextLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default LiveDataSearch
