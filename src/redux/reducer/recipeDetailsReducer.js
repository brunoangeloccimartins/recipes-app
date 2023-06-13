import ACTIONS_TYPE_RECIPE_DETAILS from '../actions-type/actions-type-recipeDetails';

const INITIAL_STATE = {
  infoRecipe: '',
};

const rececipeDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTIONS_TYPE_RECIPE_DETAILS.SAVE_RECIPE_DETAILS:
    return {
      ...state,
      infoRecipe: action.payload,
    };

  default:
    return {
      ...state,
    };
  }
};

export default rececipeDetailsReducer;
