import { useDispatch } from 'react-redux';
import { setFavoriteRecipe } from '../../redux/actions/actions-recipeDetails';
import { getSavedRecipes, removeRecipe, saveRecipes } from '../favoriteRecipesLocal';

const useFavoriteRecipe = () => {
  const dispatch = useDispatch();

  const handleAddRecipe = (type, recipe) => {
    const favorited = getSavedRecipes('favoriteRecipes');
    if (type === 'meal') {
      if (favorited.length > 0
          && favorited.some((favorites) => favorites.id === recipe.idMeal)) {
        dispatch(setFavoriteRecipe(false));
        return removeRecipe('favoriteRecipes', recipe.idMeal);
      }

      dispatch(setFavoriteRecipe(true));
      const newRecipeMeal = {
        id: recipe.idMeal,
        type,
        nationality: recipe.strArea ? recipe.strArea : '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
      saveRecipes('favoriteRecipes', newRecipeMeal);
    }
    if (type === 'drink') {
      if (favorited.length > 0
          && favorited.some((favorites) => favorites.id === recipe.idDrink)) {
        dispatch(setFavoriteRecipe(false));
        return removeRecipe('favoriteRecipes', recipe.idDrink);
      }

      dispatch(setFavoriteRecipe(true));
      const newRecipeDrink = {
        id: recipe.idDrink,
        type,
        nationality: recipe.strArea ? recipe.strArea : '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
      saveRecipes('favoriteRecipes', newRecipeDrink);
    }
  };

  const verifyFavorites = (id) => {
    const favorited = getSavedRecipes('favoriteRecipes');
    if (favorited.length > 0
      && favorited.some((favorites) => favorites.id === id)) {
      return dispatch(setFavoriteRecipe(true));
    }
    return dispatch(setFavoriteRecipe(false));
  };

  return {
    handleAddRecipe,
    verifyFavorites,
  };
};

export default useFavoriteRecipe;
