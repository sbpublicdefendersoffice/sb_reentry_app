import { Dispatch, SetStateAction } from 'react'
import NextLink from 'next/link'

import Paragraph from '../ui/Paragraph'
import { OrgRecord } from '../types/records'

import styles from './GlobalSearchResult.module.css'

interface GlobalSearchResultProps {
  record: OrgRecord
  delimiter: string
  setIsFocused: Dispatch<SetStateAction<boolean>>
}

const GlobalSearchResult = ({
  setIsFocused,
  record,
  delimiter,
}: GlobalSearchResultProps) => {
  const mapRecordSearchTerms = (tags: string[]): string => tags.join(delimiter)

  return (
    <li
      className={styles.GlobalSearchResult}
      tabIndex={0}
      onClick={() => setIsFocused(false)}
    >
      <NextLink href="/search/[id]" as={`/search/${record.id}`}>
        <Paragraph size="med-text">
          <span>
            {record.fields.org_name || record.fields.org_name_spanish}
          </span>
        </Paragraph>
      </NextLink>
      <em className={styles.SingleSearchTerm}>
        {mapRecordSearchTerms(
          record.fields?.org_tags || record.fields?.org_tags_spanish,
        )}
      </em>
    </li>
  )
}

export default GlobalSearchResult
