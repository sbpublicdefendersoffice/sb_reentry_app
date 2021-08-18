import { createContext } from 'react'

const useFavorite = createContext({
  favoriteResources: [],
  updateFavoriteResources: (id, record) => null, // eslint-disable-line no-unused-vars
})

export const FavoriteProvider = useFavorite.Provider
export default useFavorite
