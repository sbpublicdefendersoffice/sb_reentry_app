import { Fragment } from 'react'

import { useFavorite, useLanguage } from '../../hooks/'
import { GlobalSearchResult, HeadTags } from '../../components'
import { Title, Paragraph } from '../../ui'
import { useStyles, favoritesCopy, siteTitle } from '../../constants/'
const FavoritePage = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const { favoriteResources } = useFavorite()
  const activeCopy = favoritesCopy[language]
  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${activeCopy.title}`}
        href="/favorites"
        description="A place to save your favorite resources on ThriveSBC"
      />
      <div className={classes.root} style={{ fontFamily: 'sans-serif' }}>
        <Title>{activeCopy.title}</Title>
        <div style={{ marginTop: '2rem' }}>
          {favoriteResources.length ? (
            favoriteResources.map((record, i) => (
              <Fragment key={i}>
                <GlobalSearchResult record={record} />
              </Fragment>
            ))
          ) : (
            <Paragraph size="med-text">{activeCopy.emptyMessage}</Paragraph>
          )}
        </div>
      </div>
    </>
  )
}
export default FavoritePage
