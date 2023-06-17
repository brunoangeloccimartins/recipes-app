import ACTIONS_TYPE_RECIPE_DETAILS from '../actions-type/actions-type-recipeDetails';

export const saveRecipeDetails = (payload) => ({
  type: ACTIONS_TYPE_RECIPE_DETAILS.SAVE_RECIPE_DETAILS,
  payload,
});

export const copyRecipeLink = (payload) => ({
  type: ACTIONS_TYPE_RECIPE_DETAILS.COPY_RECIPE_LINK,
  payload,
});

export const setFavoriteRecipe = (payload) => ({
  type: ACTIONS_TYPE_RECIPE_DETAILS.SET_FAVORITE_RECIPE,
  payload,
});

export const setRandomRecipe = (payload) => ({
  type: ACTIONS_TYPE_RECIPE_DETAILS.SET_RANDOM_RECIPE,
  payload,
});
