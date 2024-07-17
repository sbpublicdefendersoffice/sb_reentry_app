import { Dispatch, SetStateAction } from 'react'
import NextLink from 'next/link'
import Paragraph from '../ui/Paragraph'
import { PGOrganizationResponse } from '../types/postgresRecords'
import { useFavorite, useLanguage } from '../hooks/'
import styles from './GlobalSearchResult.module.css'
import { Favorite, FavoriteBorder } from '@mui/icons-material'

export interface GlobalSearchResultProps {
  record: PGOrganizationResponse
  searchQuery?: string
  delimiter?: string
  setIsFocused?: Dispatch<SetStateAction<boolean>>
}
const GlobalSearchResult = ({
  searchQuery,
  record,
  delimiter,
  setIsFocused,
}: GlobalSearchResultProps) => {
  const { id, multiple_categories } = record
  const { language } = useLanguage()
  const imgSrc = multiple_categories ? multiple_categories[0] : 'socialservices'
  const { favoriteResources, updateFavoriteResources } = useFavorite()
  const isFavIcon = (
    <Favorite
      data-testid="filled-heart"
      style={{
        color: '#13385E',
        fontSize: '3rem',
      }}
    />
  )
  const isNotFavIcon = (
    <FavoriteBorder data-testid="outline-heart" style={{ fontSize: '3rem' }} />
  )
  const heart = favoriteResources.some(item => item.id === id)
    ? isFavIcon
    : isNotFavIcon
  const mapRecordSearchTerms = (tags: string[]): string =>
    tags.filter(tag => tag.includes(searchQuery)).join(delimiter)

  const clickHeart = e => {
    e.preventDefault()
    updateFavoriteResources(id, record)
  }

  return (
    <NextLink href="/orgs/[id]" as={`/orgs/${id}`}>
      <li
        onClick={() => setIsFocused(false)}
        role="listitem"
        className={styles.GlobalSearchResult}
        tabIndex={0}
      >
        <img
          role="img"
          width="3rem"
          height="3rem"
          className={styles.Image}
          src={`/icons/${imgSrc.replace(' ', '')}.svg`}
          alt={`${imgSrc}_icon`}
        />
        <div className={styles.Text}>
          <Paragraph size="med-text">
            <span role="heading">{record[`name_${language}`]}</span>
          </Paragraph>
          <em role="term" className={styles.SingleSearchTerm}>
            {mapRecordSearchTerms(record[`tags_${language}`])}
          </em>
        </div>
        <button
          role="button"
          style={{ background: 'none', border: 'none' }}
          id={String(id)}
          onClick={clickHeart}
        >
          <div className="resource-favorite">{heart}</div>
        </button>
      </li>
    </NextLink>
  )
}
export default GlobalSearchResult
