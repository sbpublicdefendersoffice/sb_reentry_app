import React, {useContext,Fragment} from 'react'
import{ FavoriteContext, useLanguage} from "../../hooks/";
import { GlobalSearchResult} from '../../components'
import { Title } from '../../ui'
import {
  useStyles,
  favoritesCopy,
} from '../../constants/'
const FavoritePage = () => {
  const { language } = useLanguage()
  const classes = useStyles()
  const { favoriteResources } = useContext(FavoriteContext);
  let activeCopy = favoritesCopy[language]
  return (
    <div className={classes.root}>
          <Title>{activeCopy.title}</Title>
          <div style ={{marginTop: "4rem"}}>
            {favoriteResources.length==0 && <h3>{activeCopy.emptyMessage}</h3>}
            {favoriteResources.map((record, i) => (
              <Fragment key={i}>
                <GlobalSearchResult
                  record={record}
                />
              </Fragment>
            ))}
          </div>
    </div>
  )
}
export default FavoritePage
