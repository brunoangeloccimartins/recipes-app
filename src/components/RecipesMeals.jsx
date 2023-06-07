/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../services/hooks/useFetch';
import { fetchRecipe,
  fetchMealsByCategory,
} from '../services/fetchRequisition';
import Button from './Button';

function RecipesMeals() {
  const [recipesMeals, setRecipesMeals] = useState({});
  const [recipesMealsByCategories, setRecipesMealsByCategories] = useState([]);
  const [category, setCategory] = useState('All');
  const { fetchData } = useFetch();

  const fetchRecipesByMeals = async () => {
    const URLmeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    await fetchData(fetchRecipe(URLmeals), setRecipesMeals);
  };

  const fetchRecipesByMealsByCategories = async () => {
    const URLmeals = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const response = await fetchRecipe(URLmeals);
    const modifiedData = [{ strCategory: 'All' }, ...response.meals];
    setRecipesMealsByCategories(modifiedData);
  };

  const filterByMeals = async (categories) => {
    const recipesMealsByCategory = fetchMealsByCategory(categories);
    await fetchData(recipesMealsByCategory, setRecipesMeals);
  };

  const toggleFilter = (categories) => {
    setCategory(categories);
    if (categories === category) {
      setCategory(categories);
    }

    if (categories === 'All' || category === categories) {
      fetchRecipesByMeals();
    } else {
      filterByMeals(categories);
    }
  };

  useEffect(() => {
    fetchRecipesByMeals();
    fetchRecipesByMealsByCategories();
  }, []);
  return (
    <div>
      <div>
        <div>
          {recipesMealsByCategories !== undefined
          && recipesMealsByCategories.map((recipe, index) => {
            const maxCategories = 5;
            if (index <= maxCategories) {
              return (
                <Button
                  key={ recipe.strCategory }
                  value={ recipe.strCategory }
                  test={ recipe.strCategory !== 'All'
                    ? `${recipe.strCategory}-category-filter`
                    : 'All-category-filter' }
                  onClick={ () => toggleFilter(recipe.strCategory) }
                />
              );
            }
            return null;
          })}
        </div>
        {recipesMeals.meals
          && recipesMeals.meals.map((recipe, index) => {
            const maxRecipes = 11;
            if (index <= maxRecipes) {
              return (
                <Link
                  to={ `/meals/${recipe.idMeal}` }
                  key={ recipe.idMeal }
                >
                  <div
                    data-testid={ `${index}-recipe-card` }
                  >

                    <h1
                      data-testid={ `${index}-card-name` }
                    >
                      {recipe.strMeal}
                    </h1>

                    <img
                      src={ recipe.strMealThumb }
                      alt={ recipe.strMeal }
                      data-testid={ `${index}-card-img` }
                    />
                  </div>
                </Link>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}

export default RecipesMeals;
