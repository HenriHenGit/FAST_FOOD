export const setFavorite = (favoriteResponse) => {
    return {
      type: 'SET_FAVORITE',
      payload: favoriteResponse,
    };
  };
  
  export const setFindProduct = (findProduct) => {
    return {
      type: 'SET_FIND_PRODUCT',
      payload: findProduct,
    };
};