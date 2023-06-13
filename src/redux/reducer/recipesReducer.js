import ACTION_TYPE_SAVED_RECIPES from '../actions-type/actions-type-recipes';

const INITIAL_STATE = {
  recipesMeals: [],
  recipesDrinks: [],
};

const saveRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_TYPE_SAVED_RECIPES.MEALS:
    return {
      ...state,
      recipesMeals: action.payload,
    };
  case ACTION_TYPE_SAVED_RECIPES.DRINKS:
    return {
      ...state,
      recipesDrinks: action.payload,
    };
  default:
    return {
      ...state,
    };
  }
};

export default saveRecipesReducer;
