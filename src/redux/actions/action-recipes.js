import ACTION_TYPE_SAVED_RECIPES from '../actions-type/actions-type-recipes';

export const saveRecipesMeals = (payload) => ({
  type: ACTION_TYPE_SAVED_RECIPES.MEALS,
  payload,
});

export const saveRecipesDrinks = (payload) => ({
  type: ACTION_TYPE_SAVED_RECIPES.DRINKS,
  payload,
});
