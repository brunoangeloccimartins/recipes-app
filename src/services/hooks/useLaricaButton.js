import { useDispatch } from 'react-redux';
import { fetchRecipe } from '../fetchRequisition';
import { setRandomRecipe } from '../../redux/actions/actions-recipeDetails';

export function useRandomRecipe() {
  const dispatch = useDispatch();
  const URL_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  const getRandomRecipe = async () => {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * 2) + 1;
    console.log(randomNumber);
    let randomRecipe;
    if (randomNumber === 1) {
      randomRecipe = await fetchRecipe(URL_MEAL);
      return dispatch(setRandomRecipe(randomRecipe.meals[0]));
    }
    if (randomNumber === 2) {
      randomRecipe = await fetchRecipe(URL_DRINK);
      return dispatch(setRandomRecipe(randomRecipe.drinks[0]));
    }
  };

  return getRandomRecipe;
}
