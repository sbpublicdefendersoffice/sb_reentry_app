import {
  useState,
  useCallback,
  useEffect,
  useRef,
  MutableRefObject,
  ChangeEvent,
  FormEvent,
  MouseEvent,
  Fragment,
} from 'react'
import { useRouter } from 'next/router'
import debounce from 'lodash/debounce'

import useLanguage from '../hooks/useLanguage'

import { Tooltip, FindMe } from './'

import Input from '../ui/Input'
import { POST } from '../helpers/validators'
import { searchCopy } from '../constants/copy'
import useGlobalSearch from '../hooks/useGlobalSearch'
import { GlobalSearchResult, SearchTermsMarquee } from './'
import { OrgRecord, TranslatedRecordResponse } from '../types/records'

import styles from './LiveDataSearch.module.css'

const delayTimeInMs: number = 500

const delimiter: string = ', '

const LiveDataSearch = () => {
  const { push } = useRouter()
  const { language } = useLanguage()
  const { searchResults, setSearchResults } = useGlobalSearch()

  const formRef: MutableRefObject<HTMLFormElement> | null = useRef(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const activeCopy = searchCopy[language]

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

  useEffect((): (() => void) => {
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
      <FindMe />
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
              formRef={formRef}
              delimiter={delimiter}
            />
          )}
          <div style={{ marginTop: tagsReady ? '3.25rem' : 0 }}>
            {searchResults.records.map((record: OrgRecord, i: number) => (
              <Fragment key={i}>
                <GlobalSearchResult
                  record={record}
                  delimiter={delimiter}
                  setIsFocused={setIsFocused}
                />
              </Fragment>
            ))}
          </div>
        </ul>
      )}
    </section>
  )
}

export default LiveDataSearch
