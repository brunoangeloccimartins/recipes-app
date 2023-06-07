/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useLocation } from 'react-router-dom';
import RecipesMeals from '../../components/RecipesMeals';
import RecipesDrinks from '../../components/RecipesDrinks';
import Footer from '../../components/Footer';
import Header from '../../components/Header/Header';

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
      <Header />
      <Footer />
    </div>
  );
}

export default Recipes;
