import ACTIONS_TYPE_RECIPE_DETAILS from '../actions-type/actions-type-recipeDetails';

const INITIAL_STATE = {
  infoRecipe: '',
  isCopied: false,
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
  default:
    return {
      ...state,
    };
  }
};

export default recipeDetailsReducer;
