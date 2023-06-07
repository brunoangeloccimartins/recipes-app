/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useLocation } from 'react-router-dom';
import RecipesMeals from '../../components/RecipesMeals';
import RecipesDrinks from '../../components/RecipesDrinks';

function Recipes() {
  const { pathname } = useLocation();

  return (
    <div>
      <h1>Recipes</h1>
      {pathname === '/meals' ? (
        <RecipesMeals />
      ) : (
        <RecipesDrinks />
      )}
    </div>
  );
}

export default Recipes;
