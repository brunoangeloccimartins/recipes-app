import PropTypes from 'prop-types';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from './Button';
import MyCarousel from './Carousel';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import witheHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function DrinkDetails({ drink, drinkIngredients,
  isFavorite, progress, isDisable, copied, handleAddRecipe, handleCopy }) {
  const history = useHistory();
  const { id } = useParams();

  return (
    <div
      style={ { paddingTop: '15px', paddingBottom: '15px' } }
    >
      { drink.length && drink.map((recipe, index) => (
        <div key={ index }>
          <div className="container">
            <Card>
              <Card.Img
                variant="top"
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
              />
              <Card.Body>
                <Card.Title>
                  {recipe.strDrink}
                </Card.Title>
                <Card.Text
                  style={ {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  } }
                >
                  { `Category: ${recipe.strAlcoholic}` }
                  <div className="container-share-favorite-btns">
                    <Button
                      value={
                        <img
                          src={ shareIcon }
                          alt="Compartilhar"
                          data-testid="share-btn"
                        />
                      }
                      onClick={ () => handleCopy('drink', recipe.idDrink) }
                    />
                    <Button
                      value={
                        <img
                          src={ isFavorite ? blackHeartIcon : witheHeartIcon }
                          alt="Favoritar"
                        />
                      }
                      onClick={ () => handleAddRecipe('drink', recipe) }
                    />
                    { copied && <p>Link copied!</p>}
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="container">
            <Card>
              <Card.Body>
                <Card.Title>
                  Ingredients:
                </Card.Title>
                <Card.Text>
                  { drinkIngredients.map(({ ingredients, measures }, index2) => (
                    <ListGroup key={ index2 } numbered>
                      { ingredients.map((ingredient, index3) => (
                        <ListGroup.Item
                          key={ index3 }
                        >
                          { `${ingredient} - ${measures[index3]
                            ? measures[index3]
                            : 'to taste'}` }
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="container">
            <Card>
              <Card.Body>
                <Card.Title>
                  Step-by-step:
                </Card.Title>
                <Card.Text>
                  { recipe.strInstructions.split('. ').map((frase) => (
                    <p key={ frase }>{ `${frase}.` }</p>
                  )) }
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

        </div>
      ))}
      <MyCarousel />
      <Button
        test="start-recipe-btn"
        value={ progress ? 'Continue Recipe' : 'Start Recipe' }
        style={ { position: 'fixed', bottom: '0' } }
        onClick={ () => history.push(`/drinks/${id}/in-progress`) }
        disabled={ isDisable }
        className="btn-login btn-bottom"
      />
    </div>
  );
}

DrinkDetails.propTypes = {
  copied: PropTypes.bool.isRequired,
  handleCopy: PropTypes.func.isRequired,
  drink: PropTypes.shape({
    length: PropTypes.func,
    map: PropTypes.func,
  }).isRequired,
  drinkIngredients: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  handleAddRecipe: PropTypes.func.isRequired,
  isDisable: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  progress: PropTypes.bool.isRequired,
};

export default DrinkDetails;
