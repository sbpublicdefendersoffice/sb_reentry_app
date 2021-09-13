import { Fragment } from 'react'
import Head from 'next/head'
import { useFavorite, useLanguage } from '../../hooks/'
import { GlobalSearchResult } from '../../components'
import { Title, Paragraph } from '../../ui'
import { useStyles, favoritesCopy, siteTitle } from '../../constants/'
const FavoritePage = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const { favoriteResources } = useFavorite()
  const activeCopy = favoritesCopy[language]
  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${activeCopy.title}`}</title>
      </Head>
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
