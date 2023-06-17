import React from 'react';
import { useSelector } from 'react-redux';
import { useRandomRecipe } from '../../services/hooks/useLaricaButton';
import Button from '../Button';
import './RandomRecipeCard.css';

function RandomRecipeCard() {
  const { randomRecipe } = useSelector((rootReducer) => rootReducer.recipeDetails);
  const getRandomRecipe = useRandomRecipe();
  return (
    <div className={ randomRecipe !== null ? 'preview-card' : 'hidden-card' }>
      { randomRecipe
        && (
          <div className="recipe-preview-content">
            <div className="preview-name">
              <p>
                { randomRecipe.strMeal
                  ? randomRecipe.strMeal
                  : randomRecipe.strDrink}
              </p>
            </div>
            <img
              src={ randomRecipe.strMealThumb
                ? randomRecipe.strMealThumb : randomRecipe.strDrinkThumb }
              alt="Recipe preview"
            />
            <div className="category-container">
              <p className="preview-category">{ randomRecipe.strCategory}</p>
              {' '}
              { randomRecipe.strAlcoholic
              && <p>{randomRecipe.strAlcoholic}</p> }
            </div>
            <div className="random-btn-container">
              <Button
                className="random-again-btn"
                value="Random again"
                onClick={ getRandomRecipe }
              />
              <Button
                className="like-btn"
                value="I like it! Let's go!"
              />
            </div>
          </div>
        )}
    </div>
  );
}

export default RandomRecipeCard;
