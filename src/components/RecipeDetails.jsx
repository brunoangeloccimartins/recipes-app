import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import YouTubePlayer from './YoutubePlayer';
import { fetchMealsById, fetchDrinksById } from '../services/fetchRequisition';
import Button from './Button';
import MyCarousel from './Carousel';
import ObjectEntries from '../services/objectEntries';

function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();
  const { location: { pathname } } = history;
  const [meal, setMeal] = useState({});
  const [mealIngredients, setMealIngredients] = useState([]);
  const [drink, setDrink] = useState({});
  const [drinkIngredients, setDrinkIngredients] = useState([]);

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
      const drinkEntries = ObjectEntries('strIngredient', drinkItem);
      setDrink([drinkItem]);
      console.log(drinkItem);
      setDrinkIngredients(drinkEntries);
    }
  };

  useEffect(() => {
    requestDetails();
  }, []);

  return (
    <div>
      { pathname.includes('/meals')
      && (
        <div>
          { meal.length && meal.map((recipe, index) => (
            <div key={ index }>
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid="recipe-photo"
              />
              <p data-testid="recipe-title">{ recipe.strMeal }</p>
              <p data-testid="recipe-category">{ recipe.strCategory }</p>
              <div>
                { mealIngredients.map(({ ingredients, measures }, index2) => (
                  <ol
                    key={ index2 }
                  >
                    { ingredients.map((ingredient, index3) => (
                      <li
                        key={ index3 }
                        data-testid={ `${index3}-ingredient-name-and-measure` }
                      >
                        { `${ingredient} - ${measures[index3]}` }
                      </li>
                    )) }
                  </ol>
                ))}
              </div>
              <p data-testid="instructions">{ recipe.strInstructions }</p>
              <YouTubePlayer test="video" videoUrl={ recipe.strYoutube } />
            </div>
          ))}
          <MyCarousel />
          <Button
            test="start-recipe-btn"
            value="Start Recipe"
            style={ { position: 'fixed', bottom: '0' } }
          />
        </div>
      )}
      { pathname.includes('/drinks')
      && (
        <div>
          { drink.length && drink.map((recipe, index) => (
            <div key={ index }>
              <img
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                data-testid="recipe-photo"
              />
              <p data-testid="recipe-title">{ recipe.strDrink }</p>
              <p data-testid="recipe-category">{ recipe.strAlcoholic }</p>
              <div>
                { drinkIngredients.map(({ ingredients, measures }, j) => (
                  <ol
                    key={ j }
                  >
                    { ingredients.map((ingredient, k) => (
                      <li
                        key={ k }
                        data-testid={ `${k}-ingredient-name-and-measure` }
                      >
                        { `${ingredient} - ${measures[k] ? measures[k] : 'to taste'}` }
                      </li>
                    )) }
                  </ol>
                ))}
              </div>
              <p data-testid="instructions">{ recipe.strInstructions }</p>
            </div>
          ))}
          <MyCarousel />
          <Button
            test="start-recipe-btn"
            value="Start Recipe"
            style={ { position: 'fixed', bottom: '0' } }
          />
        </div>

      )}
    </div>
  );
}

//
export default RecipeDetails;
