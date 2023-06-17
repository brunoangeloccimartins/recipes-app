import ACTIONS_TYPE_RECIPE_DETAILS from '../actions-type/actions-type-recipeDetails';

const INITIAL_STATE = {
  infoRecipe: '',
  isCopied: false,
  isFavorite: false,
  randomRecipe: null,
};

const recipeDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTIONS_TYPE_RECIPE_DETAILS.SAVE_RECIPE_DETAILS:
    return {
      ...state,
      infoRecipe: action.payload,
    };
  case ACTIONS_TYPE_RECIPE_DETAILS.COPY_RECIPE_LINK:
    return {
      ...state,
      isCopied: action.payload,
    };
  case ACTIONS_TYPE_RECIPE_DETAILS.SET_FAVORITE_RECIPE:
    return {
      ...state,
      isFavorite: action.payload,
    };
  case ACTIONS_TYPE_RECIPE_DETAILS.SET_RANDOM_RECIPE:
    return {
      ...state,
      randomRecipe: action.payload,
    };
  default:
    return {
      ...state,
    };
  }
};

export default recipeDetailsReducer;
