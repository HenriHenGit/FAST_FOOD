const initialState = {
    favorite: [],
    findProduct: {},
  };
  
  const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FAVORITE':
        return {
          ...state,
          favorite: action.payload,
        };
      case 'SET_FIND_PRODUCT':
        return {
          ...state,
          findProduct: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default favoriteReducer;