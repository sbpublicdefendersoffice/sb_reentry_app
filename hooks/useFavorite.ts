import { createContext, useContext } from 'react'

const favorite = createContext({
  favoriteResources: [],
  updateFavoriteResources: (id, record) => null, // eslint-disable-line no-unused-vars
})

export const { Provider } = favorite

const useFavorite = () => useContext(favorite)

export default useFavorite
