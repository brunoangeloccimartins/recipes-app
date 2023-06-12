import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import useFetch from '../services/hooks/useFetch';
// import { fetchMealsById, fetchDrinksById } from '../services/fetchRequisition';

function RecipeDetails() {
  const history = useHistory();
  // const { fetchData } = useFetch();
  const { location: { pathname } } = history;
  const [meal, setMeal] = useState({});
  const [drink, setDrink] = useState({});
  const { id } = useParams();

  const requestDetails = async () => {
    if (pathname.includes('/meals')) {
      const mealRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const mealResponse = await mealRequest.json();
      const mealItem = Object.values(mealResponse)[0][0];
      setMeal([mealItem]);
      console.log(mealItem);
    }
    if (pathname.includes('/drinks')) {
      const drinkRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const drinkResponse = await drinkRequest.json();
      setDrink(drinkResponse);
    }
  };

  useEffect(() => {
    requestDetails();
  }, []);

  return (
    <div>
      { meal.length && meal.map((recipe, index) => (
        <p key={ index }>{ recipe.strMeal }</p>
      ))}
    </div>
  );
}

//
export default RecipeDetails;
