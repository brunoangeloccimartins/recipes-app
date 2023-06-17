import PropTypes from 'prop-types';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from './Button';
import MyCarousel from './Carousel';
// import YouTubePlayer from './YoutubePlayer';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import witheHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function MealDetails({ meal, mealIngredients,
  isFavorite, progress, isDisable, copied, handleAddRecipe, handleCopy }) {
  const history = useHistory();
  const { id } = useParams();

  return (
    <div
      style={ { paddingTop: '15px', paddingBottom: '15px' } }
    >
      { meal.length && meal.map((recipe, index) => (
        <div key={ index }>
          <Card
            style={ { width: '18rem', marginTop: '0', paddingTop: '15px' } }
            className="container"
          >
            <Card.Img
              variant="top"
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
            />
            <Card.Body>
              <Card.Title
                data-testid={ `${index}-card-name` }
              >
                {recipe.strMeal}
              </Card.Title>
              <Card.Text>
                { `Category: ${recipe.strCategory}` }
              </Card.Text>
            </Card.Body>
          </Card>

          <div>
            <Card
              style={ { width: '18rem' } }
              className="container"
            >
              <Card.Body>
                <Card.Title>
                  Ingredients:
                </Card.Title>
                <Card.Text>
                  { mealIngredients.map(({ ingredients, measures }, index2) => (
                    <ListGroup key={ index2 } numbered>
                      { ingredients.map((ingredient, index3) => (
                        <ListGroup.Item
                          key={ index3 }
                          data-testid={ `${index3}-ingredient-name-and-measure` }
                        >
                          { `${ingredient} - ${measures[index3]}` }
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>

          </div>
          <Card style={ { width: '18rem' } } className="container">
            <Card.Body>
              <Card.Text>
                { recipe.strInstructions.split('. ').map((frase) => (
                  <p key={ frase }>{ `${frase}.` }</p>
                )) }
              </Card.Text>
            </Card.Body>
          </Card>
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
          { copied && <p>Link copied!</p>}
          <iframe
            title={ `${index}-video` }
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
            style={ { width: '100%', height: '300px' } }
          />
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
  copied: PropTypes.bool.isRequired,
  handleAddRecipe: PropTypes.func.isRequired,
  handleCopy: PropTypes.func.isRequired,
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
