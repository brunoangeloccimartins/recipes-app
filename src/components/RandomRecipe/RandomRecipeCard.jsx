import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useRandomRecipe } from '../../services/hooks/useLaricaButton';
import Button from '../Button';
import RemoveBtn from '../../images/icons/removeBtn.png';
import { setRandomRecipe } from '../../redux/actions/actions-recipeDetails';
import './RandomRecipeCard.css';

function RandomRecipeCard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { randomRecipe } = useSelector((rootReducer) => rootReducer.recipeDetails);
  const getRandomRecipe = useRandomRecipe();

  const redirectToDetails = () => {
    if (randomRecipe.idMeal) {
      history.push(`/meals/${randomRecipe.idMeal}`);
    }
    if (randomRecipe.idDrink) {
      history.push(`/drinks/${randomRecipe.idDrink}`);
    }
  };

  return (
    <div className={ randomRecipe !== null ? 'preview-card' : 'hidden-card' }>
      { randomRecipe
        && (
          <div className="recipe-preview-content">
            <Button
              value={
                <img
                  src={ RemoveBtn }
                  alt="remove button"
                />
              }
              className="remove-preview-btn"
              onClick={ () => dispatch(setRandomRecipe(null)) }
            />
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
              <p className="preview-category">
                <strong>{ randomRecipe.strCategory}</strong>
              </p>
              { randomRecipe.strAlcoholic
              && (
                <p>
                  <i>
                    {randomRecipe.strAlcoholic}
                  </i>
                </p>
              )}
            </div>
            <div className="random-btn-container">
              <Button
                className="random-again-btn"
                value="Surprise me"
                onClick={ getRandomRecipe }
              />

              <Button
                className="like-btn"
                value="Let's go!"
                onClick={ redirectToDetails }
              />
            </div>
          </div>
        )}
    </div>
  );
}

export default RandomRecipeCard;
