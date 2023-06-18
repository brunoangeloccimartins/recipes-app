import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import { fetchRecipe } from '../services/fetchRequisition';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div
      style={ { paddingBottom: '30px' } }
    >
      <Carousel
        interval={ 2000 }
        className="container"
        variant="dark"
      >
        { pathname.includes('/meals')
          ? (recipesDrinks.length && recipesDrinks.slice(0, maxCarousel)
            .map((drink, index) => (

              <Carousel.Item key={ index }>
                <img
                  className="d-block w-100"
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
                <Carousel.Caption>
                  <h3>{ drink.strDrink }</h3>
                </Carousel.Caption>
              </Carousel.Item>

            )))
          : (recipesMeals.length && recipesMeals.slice(0, maxCarousel)
            .map((recipe, index) => (

              <Carousel.Item key={ index }>
                <img
                  className="d-block w-100"
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                />
                <Carousel.Caption>
                  <h3>{ recipe.strMeal }</h3>
                </Carousel.Caption>
              </Carousel.Item>

            )))}
      </Carousel>
    </div>
  );
}

export default MyCarousel;
