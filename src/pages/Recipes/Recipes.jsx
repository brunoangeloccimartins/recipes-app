/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RecipesMeals from '../../components/RecipesMeals';
import RecipesDrinks from '../../components/RecipesDrinks';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import '../../components/RandomRecipe/RandomRecipeCard.css';
import RandomRecipeCard from '../../components/RandomRecipe/RandomRecipeCard';

function Recipes() {
  const { pathname } = useLocation();
  const { randomRecipe } = useSelector((rootReducer) => rootReducer.recipeDetails);

  return (
    <div className={ randomRecipe !== null ? 'blur-background' : 'meals-container' }>
      <Header />

      {pathname === '/meals' ? (
        <RecipesMeals />
      ) : (
        <RecipesDrinks />
      )}
      <RandomRecipeCard />
      <Footer />
    </div>
  );
}

export default Recipes;
