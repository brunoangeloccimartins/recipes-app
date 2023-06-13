import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import { fetchRecipe } from '../services/fetchRequisition';

function MyCarousel() {
  const [recipesMeals, setRecipesMeals] = useState([]);
  const [recipesDrinks, setRecipesDrinks] = useState([]);
  const { pathname } = useLocation();

  const fetchSave = () => {
    const URLdrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetchRecipe(URLdrinks).then((result) => {
      setRecipesDrinks(result.drinks);
    }).catch((err) => {
      console.log(err);
    });

    const URLmeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetchRecipe(URLmeals).then((result) => {
      setRecipesMeals(result.meals);
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    fetchSave();
  }, []);

  const maxCarousel = 6;
  return (
    <Carousel
      showThumbs={ false }
      showArrows
      showStatus={ false }
      showIndicators={ false }
    >
      { pathname.includes('/meals')
        ? (recipesDrinks.length && recipesDrinks.slice(0, maxCarousel)
          .map((drink, index) => (
            <div
              key={ index }
              style={ { display: 'flex', marginTop: '25px' } }
              data-testid={ `${index}-recommendation-card` }
            >
              <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
              <p
                data-testid={ `${index}-recommendation-title` }
              >
                { drink.strDrink }

              </p>
              <img
                src={ recipesDrinks[index + 1].strDrinkThumb }
                alt={ recipesDrinks[index + 1].strDrink }
              />
              <p data-testid={ `${index + 1}-recommendation-title` }>
                { recipesDrinks[index + 1].strDrink }

              </p>
            </div>
          )))
        : (recipesMeals.length && recipesMeals.slice(0, maxCarousel)
          .map((recipe, index) => (
            <div
              key={ index }
              style={ { display: 'flex', marginTop: '25px' } }
              data-testid={ `${index}-recommendation-card` }
            >
              <img src={ recipe.strMealThumb } alt={ recipe.strMeal } />
              <p
                data-testid={ `${index}-recommendation-title` }
              >
                { recipe.strMeal }
              </p>
              <img
                src={ recipesMeals[index + 1].strMealThumb }
                alt={ recipesMeals[index + 1].strMeal }
              />
              <p
                data-testid={ `${index + 1}-recommendation-title` }
              >
                { recipesMeals[index + 1].strMeal }

              </p>
            </div>
          )))}
    </Carousel>
  );
}

export default MyCarousel;
