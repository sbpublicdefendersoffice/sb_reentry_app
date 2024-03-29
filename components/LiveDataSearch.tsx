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

import { useLanguage, useGlobalSearch } from '../hooks/'

import Tooltip from './Tooltip'
import FindMe from './FindMe'
import GlobalSearchResult from './GlobalSearchResult'
import SearchTermsMarquee from './SearchTermsMarquee'

import Input from '../ui/Input'
import { searchByKeyword, googleSearch } from '../helpers/'
import { searchCopy, isProd } from '../constants/'
import { PGOrganizationResponse } from '../types'

import styles from './LiveDataSearch.module.css'

const delayTimeInMs: number = 500

const delimiter: string = ', '

interface LiveDataSearchProps {
  testWorkaround?: boolean
}

const LiveDataSearch = ({ testWorkaround }: LiveDataSearchProps) => {
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
      const call: PGOrganizationResponse[] = await searchByKeyword(
        searchQuery,
        language,
      )
      setSearchResults(call)
      if (isProd) googleSearch(searchQuery, language)
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
  }, [delayedQuery])

  const tagsReady: boolean =
    searchResults?.some(
      (record: PGOrganizationResponse) =>
        record.tags_english || record.tags_spanish,
    ) && Boolean(formRef.current)

  return (
    <section
      role="search"
      className={styles.LiveDataSearch}
      onFocus={() => setIsFocused(true)}
    >
      <div className={styles.SearchContainer}>
        <FindMe />
        <form
          ref={formRef}
          className={styles.SearchForm}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <label className={styles.Label} htmlFor="global-search">
            Global data search
          </label>
          <Input
            role="searchbox"
            type="search"
            id="global-search"
            className={styles.Input}
            value={searchQuery}
            onChange={handleChange}
            placeholder={`${activeCopy.search}...`}
            autoComplete="off"
          />
          <span className={styles.SearchIcon} onClick={handleSubmit}>
            &#128269;
          </span>
          <Tooltip>{activeCopy.tooltip}</Tooltip>
        </form>
      </div>
      {searchQuery && searchResults && isFocused && (
        <ul className={styles.ResultsContainer}>
          {tagsReady && !testWorkaround && (
            <SearchTermsMarquee
              searchRecords={searchResults}
              searchQuery={searchQuery}
              language={language}
              formRef={formRef}
              delimiter={delimiter}
            />
          )}
          <div>
            {searchResults.map((record: PGOrganizationResponse, i: number) => (
              <Fragment key={i}>
                <GlobalSearchResult
                  record={record}
                  delimiter={delimiter}
                  setIsFocused={setIsFocused}
                  searchQuery={searchQuery}
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
