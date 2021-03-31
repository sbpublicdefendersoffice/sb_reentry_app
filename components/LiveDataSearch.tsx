import {
  useState,
  useCallback,
  useEffect,
  useRef,
  MutableRefObject,
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
import SearchTermsMarquee from './SearchTermsMarquee'
import { OrgRecord, TranslatedRecordResponse } from '../types/records'

import styles from './LiveDataSearch.module.css'

const delayTimeInMs: number = 500

const LiveDataSearch = () => {
  const { push } = useRouter()
  const { language } = useLanguage()
  const activeCopy = searchCopy[language]
  const formRef: MutableRefObject<HTMLFormElement> | null = useRef(null)

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [recordNumberToScroll, setRecordNumberToScroll] = useState<
    number | null
  >(null)
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

  const tagsReady: boolean =
    searchResults?.records?.some(
      (record: OrgRecord) =>
        record.fields.org_tags || record.fields.org_tags_spanish,
    ) && Boolean(formRef.current)

  return (
    <section
      className={styles.LiveDataSearch}
      onFocus={() => setIsFocused(true)}
    >
      <form
        ref={formRef}
        className={styles.SearchContainer}
        onSubmit={handleSubmit}
      >
        <label className={styles.Label} htmlFor="global-search">
          Global data search
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
          {tagsReady && (
            <SearchTermsMarquee
              searchRecords={searchResults.records}
              language={language}
              recordNumberToScroll={recordNumberToScroll}
              formRef={formRef}
            />
          )}
          <div style={{ marginTop: tagsReady ? '3.25rem' : 0 }}>
            {searchResults.records.map((record: OrgRecord, i: number) => (
              <li
                className={styles.Result}
                key={i}
                tabIndex={0}
                onClick={() => setIsFocused(false)}
                onMouseEnter={() => setRecordNumberToScroll(i)}
                onMouseLeave={() => setRecordNumberToScroll(null)}
              >
                <NextLink href="/search/[id]" as={`/search/${record.id}`}>
                  <Paragraph size="med-text">
                    {record.fields.org_name || record.fields.org_name_spanish}
                  </Paragraph>
                </NextLink>
              </li>
            ))}
          </div>
        </ul>
      )}
    </section>
  )
}

export default LiveDataSearch
