import { Dispatch, SetStateAction } from 'react'
import NextLink from 'next/link'
import Paragraph from '../ui/Paragraph'
import { PGOrganizationResponse } from '../types/postgresRecords'
import useFavorite from '../hooks/useFavorite'
import styles from './GlobalSearchResult.module.css'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
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
}: GlobalSearchResultProps) => {
  const {
    id,
    name_english,
    name_spanish,
    tags_english,
    tags_spanish,
    multiple_categories,
  } = record
  const imgSrc = multiple_categories ? multiple_categories[0] : 'socialservices'
  const { favoriteResources, updateFavoriteResources } = useFavorite()
  const isFavIcon = (
    <FavoriteIcon
      data-testid="filled-heart"
      style={{ color: '#13385E', fontSize: '3rem' }}
    />
  )
  const isNotFavIcon = (
    <FavoriteBorderIcon
      data-testid="outline-heart"
      style={{ fontSize: '3rem' }}
    />
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
    <NextLink href="/search/[id]" as={`/search/${id}`}>
      <li role="listitem" className={styles.GlobalSearchResult} tabIndex={0}>
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
            <span role="heading">{name_english || name_spanish}</span>
          </Paragraph>
          <em role="term" className={styles.SingleSearchTerm}>
            {mapRecordSearchTerms(tags_english || tags_spanish)}
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
