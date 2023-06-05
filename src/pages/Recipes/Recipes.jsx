import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Recipes() {
  const { pathname } = useLocation();
  const [recipesMeals, setRecipesMeals] = useState([]);
  const [recipesDrinks, setRecipesDrinks] = useState([]);

  // const ingrediente = '';
  // const firstLetter = 'a';

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await response.json();
      // console.log(meals);
      setRecipesMeals(meals);
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await response.json();
      // console.log(drinks);
      setRecipesDrinks(drinks);
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      {pathname === '/meals' ? (
        <div>
          {recipesMeals.length > 0 && recipesMeals.map((recipe, index) => {
            const maxRecipes = 11;
            if (index <= maxRecipes) {
              return (
                <div
                  key={ recipe.idMeal }
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
              );
            }
            return null;
          })}
        </div>
      ) : (
        <div>
          {recipesDrinks.length > 0 && recipesDrinks.map((recipe, index) => {
            const maxRecipes = 11;
            if (index <= maxRecipes) {
              return (
                <div
                  key={ recipe.idDrink }
                  data-testid={ `${index}-recipe-card` }
                >

                  <h1
                    data-testid={ `${index}-card-name` }
                  >
                    {recipe.strDrink}
                  </h1>

                  <img
                    src={ recipe.strDrinkThumb }
                    alt={ recipe.strDrink }
                    data-testid={ `${index}-card-img` }
                  />

                </div>
              );
            }
            return null;
          })}

        </div>
      )}
    </div>
  );
}

export default Recipes;
