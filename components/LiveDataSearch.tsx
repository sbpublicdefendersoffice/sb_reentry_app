import { useState, useCallback, useEffect, ChangeEvent } from 'react'
import debounce from 'lodash/debounce'

import useLanguage from '../hooks/useLanguage'

import Tooltip from './Tooltip'
import { Input } from '../ui'
import { POST } from '../helpers/validators'
import { searchCopy } from '../constants/copy'

import styles from './LiveDataSearch.module.css'

const queryDelayTime: number = 500

const LiveDataSearch = () => {
  const { language } = useLanguage()
  const activeCopy = searchCopy[language]

  const [searchQuery, setSearchQuery] = useState<string>('')

  const sendQuery = async (): Promise<void> => {
    if (searchQuery) {
      const call = await fetch('/api/globalcall', {
        method: POST,
        body: JSON.stringify({ searchQuery }),
      })

      const response = await call.json()

      console.log(response)
    }
  }

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { value } = target
    setSearchQuery(value)
  }

  const delayedQuery = useCallback(debounce(sendQuery, queryDelayTime), [
    searchQuery,
  ])

  useEffect(() => {
    delayedQuery()
    return delayedQuery.cancel
  }, [searchQuery, delayedQuery])

  return (
    <div className={styles.LiveDataSearch}>
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
  )
}

export default LiveDataSearch
