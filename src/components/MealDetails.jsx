import PropTypes from 'prop-types';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import Button from './Button';
import useHandleCopy from '../services/hooks/useHandleCopy';
import MyCarousel from './Carousel';
import YouTubePlayer from './YoutubePlayer';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import witheHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function MealDetails({ meal, mealIngredients,
  isFavorite, progress, isDisable, handleAddRecipe }) {
  const history = useHistory();
  const { id } = useParams();
  const handleCopy = useHandleCopy();
  const { isCopied } = useSelector((rootReducer) => rootReducer
    .recipeDetails);
  console.log(isCopied);
  return (
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
          <Button
            value={
              <img
                src={ shareIcon }
                alt="Compartilhar"
                data-testid="share-btn"
              />
            }
            onClick={ () => handleCopy('meal', recipe.idMeal) }
          />
          <Button
            value={
              <img
                src={ isFavorite ? blackHeartIcon : witheHeartIcon }
                alt="Favoritar"
                data-testid="favorite-btn"
              />
            }
            onClick={ () => handleAddRecipe('meal', recipe) }
          />
          { isCopied && <p>Link copied!</p>}
          <YouTubePlayer test="video" videoUrl={ recipe.strYoutube } />
        </div>
      ))}
      <MyCarousel />
      <Button
        test="start-recipe-btn"
        value={ progress ? 'Continue Recipe' : 'Start Recipe' }
        style={ { position: 'fixed', bottom: '0' } }
        onClick={ () => history.push(`/meals/${id}/in-progress`) }
        disabled={ isDisable }
      />
    </div>
  );
}

MealDetails.propTypes = {
  handleAddRecipe: PropTypes.func.isRequired,
  isDisable: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  meal: PropTypes.shape({
    length: PropTypes.func,
    map: PropTypes.func,
  }).isRequired,
  mealIngredients: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  progress: PropTypes.bool.isRequired,
};

export default MealDetails;
