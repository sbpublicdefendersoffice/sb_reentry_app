import { Fragment, ReactElement, useContext } from 'react'
import { useRouter } from 'next/router'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { Grid, Button } from '@material-ui/core/'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import useLanguage from '../hooks/useLanguage'
import { PGOrganizationResponse } from '../types/'
import { ENGLISH } from '../constants/language'
import { Card, Paragraph } from '../ui'
import FavoriteProvider from '../hooks/useFavorite'
export interface OrgRecordCardProps {
  record: PGOrganizationResponse
}
export const urlSlug: string = '/[category]/[id]'
import styles from './OrgRecordCard.module.css'
const OrgRecordCard = ({ record }: OrgRecordCardProps) => {
  const { language } = useLanguage()
  const { push, pathname, query } = useRouter()
  const {
    id,
    categories_english,
    categories_spanish,
    multiple_categories,
    name_english,
    name_spanish,
  } = record
  const { favoriteResources, updateFavoriteResources } =
    useContext(FavoriteProvider)
  const isFavIcon = (
    <FavoriteIcon style={{ color: '#13385E', fontSize: '3rem' }} />
  )
  const isNotFavIcon = <FavoriteBorderIcon style={{ fontSize: '3rem' }} />
  const heart = favoriteResources.some(item => item.id === id)
    ? isFavIcon
    : isNotFavIcon
  const activeCategories: string[] =
    language === ENGLISH ? categories_english : categories_spanish
  const categoryTitle: string = multiple_categories
    ? multiple_categories[0].replace(' ', '')
    : 'socialservices'
  const isCategoryPage: boolean = pathname === '/[category]'
  const pushToRecord = (e): Promise<boolean> =>
    push(urlSlug, `/${categoryTitle}/${id}`)

  const clickHeart = e => {
    e.preventDefault()
    e.stopPropagation()
    updateFavoriteResources(id, record)
  }
  if (localStorage.getItem('favorites') === null) {
    localStorage.setItem('favorites', '[]')
  }
  if (localStorage.getItem('favoriteRecords') === null) {
    localStorage.setItem('favoriteRecords', '[]')
  }
  return (
    <Card
      data-testid="OrgRecordCard"
      role="region"
      title={String(id)}
      className={styles.OrgRecordCard}
      interactive
      onClick={pushToRecord}
    >
      <img
        role="img"
        title={String(id)}
        className={styles.Image}
        width="4rem"
        height="4rem"
        src={`/icons/${isCategoryPage ? query.category : categoryTitle}.svg`}
        alt={`${categoryTitle}_icon`}
      />
      <div>
        <Paragraph role="heading" title={String(id)} size="med-text">
          {name_english || name_spanish}
        </Paragraph>
        <Paragraph title={String(id)}>
          {activeCategories?.map(
            (category: string, i: number): ReactElement => (
              <Fragment key={i}>
                <em role="term" title={String(id)} className={styles.Category}>
                  {i !== 0 && ', '}
                  {category}
                </em>
              </Fragment>
            ),
          )}
        </Paragraph>
      </div>
      <Grid container justify="flex-end">
        <Button
          id={String(id)}
          title={String(id)}
          onClick={clickHeart}
          style={{ background: 'none', border: 'none' }}
        >
          <div>{heart}</div>
        </Button>
      </Grid>
    </Card>
  )
}
export default OrgRecordCard
