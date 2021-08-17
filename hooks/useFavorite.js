import React from "react";
const FavoriteContext = React.createContext({
    favoriteResources: [],
    updateFavoriteResources: (id, record) => null
});
export const FavoriteProvider = FavoriteContext.Provider;
export default FavoriteContext;
