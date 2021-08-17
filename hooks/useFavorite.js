import React from 'react'
const FavoriteContext = React.createContext({
  favoriteResources: [],
  updateFavoriteResources: (id, record) => null, // eslint-disable-line no-unused-vars
})
export const FavoriteProvider = FavoriteContext.Provider
export default FavoriteContext
