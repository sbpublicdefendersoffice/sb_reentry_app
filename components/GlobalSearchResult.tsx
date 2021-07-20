import { Dispatch, SetStateAction } from 'react'
import NextLink from 'next/link'

import Paragraph from '../ui/Paragraph'
import { PGOrganizationResponse } from '../types/postgresRecords'

import styles from './GlobalSearchResult.module.css'

export interface GlobalSearchResultProps {
  record: PGOrganizationResponse
  searchQuery: string
  delimiter: string
  setIsFocused: Dispatch<SetStateAction<boolean>>
}

const GlobalSearchResult = ({
  setIsFocused,
  searchQuery,
  record,
  delimiter,
}: GlobalSearchResultProps) => {
  const {
    id,
    categories_english,
    categories_spanish,
    name_english,
    name_spanish,
    tags_english,
    tags_spanish,
  } = record

  let imgSrc: string = 'socialservices'

  if (
    (categories_english && categories_english[0] !== null) ||
    (categories_spanish && categories_spanish[0] !== null)
  ) {
    imgSrc = categories_english[0] || categories_spanish[0]
  }

  const mapRecordSearchTerms = (tags: string[]): string =>
    tags.filter(tag => tag.includes(searchQuery)).join(delimiter)

  return (
    <NextLink href="/search/[id]" as={`/search/${id}`}>
      <li
        role="listitem"
        className={styles.GlobalSearchResult}
        tabIndex={0}
        onClick={() => setIsFocused(false)}
      >
        <div>
          <Paragraph size="med-text">
            <span role="heading">{name_english || name_spanish}</span>
          </Paragraph>
          <em role="term" className={styles.SingleSearchTerm}>
            {mapRecordSearchTerms(tags_english || tags_spanish)}
          </em>
        </div>
        <img
          role="img"
          width="3rem"
          height="3rem"
          className={styles.Image}
          src={`/icons/${imgSrc.replace(' ', '')}.svg`}
          alt={`${imgSrc}_icon`}
        />
      </li>
    </NextLink>
  )
}

export default GlobalSearchResult
