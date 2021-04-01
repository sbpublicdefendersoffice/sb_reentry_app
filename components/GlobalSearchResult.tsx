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
  const { id, fields } = record
  const {
    org_categories,
    org_name,
    org_name_spanish,
    org_tags,
    org_tags_spanish,
  } = fields

  const imgSrc: string = org_categories[0]

  const mapRecordSearchTerms = (tags: string[]): string => tags.join(delimiter)

  return (
    <NextLink href="/search/[id]" as={`/search/${id}`}>
      <li
        className={styles.GlobalSearchResult}
        tabIndex={0}
        onClick={() => setIsFocused(false)}
      >
        <div>
          <Paragraph size="med-text">
            <span>{org_name || org_name_spanish}</span>
          </Paragraph>
          <em className={styles.SingleSearchTerm}>
            {mapRecordSearchTerms(org_tags || org_tags_spanish)}
          </em>
        </div>
        <img
          width="3rem"
          height="3rem"
          className={styles.Image}
          src={`./icons/${imgSrc.replace(' ', '')}.svg`}
          alt={`${imgSrc}_icon`}
        />
      </li>
    </NextLink>
  )
}

export default GlobalSearchResult
