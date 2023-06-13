import ACTIONS_TYPE_RECIPE_DETAILS from '../actions-type/actions-type-recipeDetails';

export const saveRecipeDetails = (payload) => ({
  type: ACTIONS_TYPE_RECIPE_DETAILS.SAVE_RECIPE_DETAILS,
  payload,
});
