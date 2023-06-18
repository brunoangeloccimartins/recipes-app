import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CloseButton from 'react-bootstrap/CloseButton';
import Card from 'react-bootstrap/Card';
import { useRandomRecipe } from '../../services/hooks/useLaricaButton';
import Button from '../Button';
import { setRandomRecipe } from '../../redux/actions/actions-recipeDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
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
          <div className="container">
            <Card className="card-random">
              <div className="close-btn">
                <CloseButton
                  variant="rgba(0, 0, 0, 0.5)"
                  onClick={ () => dispatch(setRandomRecipe(null)) }
                />
              </div>
              <Card.Body>
                <Card.Img
                  src={ randomRecipe.strMealThumb
                    ? randomRecipe.strMealThumb : randomRecipe.strDrinkThumb }
                  alt="Recipe preview"
                />
                <Card.Title>
                  { randomRecipe.strMeal
                    ? randomRecipe.strMeal
                    : randomRecipe.strDrink}
                </Card.Title>
                <Card.Text>
                  { randomRecipe.strCategory}
                  <br />
                  { randomRecipe.strAlcoholic
                  && (
                    <i>
                      {randomRecipe.strAlcoholic}
                    </i>
                  )}
                  <br />
                </Card.Text>
                <div className="btn-random">
                  <Button
                    className="btn-login"
                    value="Other recipe"
                    onClick={ getRandomRecipe }
                  />

                  <Button
                    className="btn-login"
                    value="Let's go!"
                    onClick={ redirectToDetails }
                  />
                </div>
              </Card.Body>
            </Card>

          </div>
        )}
    </div>
  );
}

export default RandomRecipeCard;
