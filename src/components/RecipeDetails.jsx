/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import YouTubePlayer from './YoutubePlayer';
import { fetchMealsById, fetchDrinksById } from '../services/fetchRequisition';
// import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
// import witheHeartIcon from '../images/whiteHeartIcon.svg';
// import Button from './Button';
// import MyCarousel from './Carousel';
import ObjectEntries from '../services/objectEntries';
import DrinkDetails from './DrinkDetails';

import { getSavedRecipes,
  saveRecipes,
  removeRecipe,
} from '../services/favoriteRecipesLocal';
import MealDetails from './MealDetails';
import { getSavedProgress } from '../services/localStorageProgress';

function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();
  const { location: { pathname } } = history;
  const [meal, setMeal] = useState({});
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [mealIngredients, setMealIngredients] = useState([]);
  const [drink, setDrink] = useState({});
  const [localStorageProgress, setLocalStorageProgress] = useState({});// [0][0
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);

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

  const handleCopy = (type, ids) => {
    console.log(type);
    let textToCopy;
    const countTimeOut = 3000;

    if (type === 'meal') {
      textToCopy = `http://localhost:3000/meals/${ids}`;
    }
    if (type === 'drink') { textToCopy = `http://localhost:3000/drinks/${ids}`; }

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, countTimeOut);
        console.log('Link copied!');
      })
      .catch((error) => {
        console.error('Erro ao copiar o texto:', error);
      });
  };

  const verifyFavorites = () => {
    const favorited = getSavedRecipes('favoriteRecipes');
    if (favorited.length > 0
      && favorited.some((favorites) => favorites.id === id)) {
      setIsFavorite(true);
    }
  };

  const handleAddRecipe = (type, recipe) => {
    const favorited = getSavedRecipes('favoriteRecipes');
    if (type === 'meal') {
      if (favorited.length > 0
        && favorited.some((favorites) => favorites.id === recipe.idMeal)) {
        setIsFavorite(false);
        return removeRecipe('favoriteRecipes', recipe.idMeal);
      }
      setIsFavorite(true);
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
        setIsFavorite(false);
        return removeRecipe('favoriteRecipes', recipe.idDrink);
      }

      setIsFavorite(true);
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
    requestDetails();
    disableButton();
    verifyFavorites();
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
          isFavorite={ isFavorite }
          progress={ isRecipeInProgress }
          isDisable={ isDisable }
          copied={ copied }
          handleAddRecipe={ handleAddRecipe }
          handleCopy={ handleCopy }
        />
      )}
      { pathname.includes('/drinks')
      && (
        <DrinkDetails
          drink={ drink }
          drinkIngredients={ drinkIngredients }
          isFavorite={ isFavorite }
          progress={ isRecipeInProgress }
          isDisable={ isDisable }
          copied={ copied }
          handleAddRecipe={ handleAddRecipe }
          handleCopy={ handleCopy }
        />
      )}
    </div>
  );
}

//
export default RecipeDetails;
