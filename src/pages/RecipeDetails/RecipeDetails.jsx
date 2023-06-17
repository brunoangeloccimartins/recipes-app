/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { fetchMealsById, fetchDrinksById } from '../../services/fetchRequisition';
import ObjectEntries from '../../services/objectEntries';
import DrinkDetails from '../../components/DrinkDetails';

import { getSavedRecipes } from '../../services/favoriteRecipesLocal';
import MealDetails from '../../components/MealDetails';
import { getSavedProgress } from '../../services/localStorageProgress';
import useFavoriteRecipe from '../../services/hooks/useFavoriteRecipe';
import { filterByCountry } from '../../redux/actions/actions-searchBar';

function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { location: { pathname } } = history;
  const [meal, setMeal] = useState({});
  const [mealIngredients, setMealIngredients] = useState([]);
  const [drink, setDrink] = useState({});
  const [localStorageProgress, setLocalStorageProgress] = useState({});// [0][0
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);
  const { verifyFavorites } = useFavoriteRecipe();

  const requestDetails = async () => {
    if (pathname.includes('/meals')) {
      const mealData = await fetchMealsById(id);
      console.log(mealData);
      const mealItem = mealData.meals[0];
      const mealEntries = ObjectEntries('strIngredient', mealItem);
      setMeal([mealItem]);
      setMealIngredients(mealEntries);
    }
    if (pathname.includes('/drinks')) {
      const drinkData = await fetchDrinksById(id);
      const drinkItem = drinkData.drinks[0];
      console.log(drinkItem);
      const drinkEntries = ObjectEntries('strIngredient', drinkItem);
      setDrink([drinkItem]);
      setDrinkIngredients(drinkEntries);
    }
  };

  const disableButton = () => {
    const doneRecipesData = getSavedRecipes('doneRecipes');
    if (pathname.includes('/meals')) {
      const containIdMeal = doneRecipesData
        .some((recipe) => recipe.id === meal.idMeal);
      if (containIdMeal) { setIsDisable(true); }
    }
    if (pathname.includes('/drinks')) {
      const containIdDrink = doneRecipesData
        .some((recipe) => recipe.id === drink.idDrink);
      if (containIdDrink) { setIsDisable(true); }
    }
  };

  const verifyRecipe = () => {
    if (pathname.includes('/meals') && Object.prototype
      .hasOwnProperty.call(localStorageProgress.meals, id)) {
      return setIsRecipeInProgress(true);
    }
    if (pathname.includes('/drinks') && Object.prototype
      .hasOwnProperty.call(localStorageProgress.drinks, id)) {
      return setIsRecipeInProgress(true);
    }
    return setIsRecipeInProgress(false);
  };

  useEffect(() => {
    // Teste();
    dispatch(filterByCountry('Search by country'));
    requestDetails();
    disableButton();
    verifyFavorites(id);
    const inProgressData = getSavedProgress('inProgressRecipes');
    if (inProgressData
      && Object.keys(inProgressData).length !== 0) {
      setLocalStorageProgress(inProgressData);
    }
  }, []);

  useEffect(() => {
    if (localStorageProgress && Object.keys(localStorageProgress).length !== 0) {
      verifyRecipe();
    }
  }, [localStorageProgress]);

  return (
    <div>
      { pathname.includes('/meals')
      && (
        <MealDetails
          meal={ meal }
          mealIngredients={ mealIngredients }
          progress={ isRecipeInProgress }
          isDisable={ isDisable }
        />
      )}
      { pathname.includes('/drinks')
      && (
        <DrinkDetails
          drink={ drink }
          drinkIngredients={ drinkIngredients }
          progress={ isRecipeInProgress }
          isDisable={ isDisable }
        />
      )}
    </div>
  );
}

//
export default RecipeDetails;
