/* eslint-disable react/jsx-max-depth */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { ListGroupItem } from 'react-bootstrap';
import { fetchDrinksById } from '../../services/fetchRequisition';
import ObjectEntries from '../../services/objectEntries';
import Button from '../../components/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import witheHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import disableButton from '../../services/disableButton';

import '../../styles/RecipeInProgress.css';
import { getSavedProgress, saveProgress } from '../../services/localStorageProgress';
import useHandleCopy from '../../services/hooks/useHandleCopy';
import useFavoriteRecipe from '../../services/hooks/useFavoriteRecipe';

export default function DrinksInProgress({ copied }) {
  const history = useHistory();
  const { id } = useParams();
  const { location: { pathname } } = history;
  const [disabled, setDisabled] = useState(true);
  const [checked, setChecked] = useState([]);
  const [drink, setDrink] = useState({});
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const handleCopy = useHandleCopy();
  const { handleAddRecipe } = useFavoriteRecipe();
  const { isFavorite } = useSelector((rootReducer) => rootReducer.recipeDetails);

  useEffect(() => {
    const savedProgress = getSavedProgress('inProgressRecipes');
    if (Object.keys(savedProgress.drinks).length > 0 && savedProgress.drinks) {
      const progress = savedProgress.drinks.find((el) => el.id === id);
      if (progress !== undefined) {
        setChecked(progress.newChecked);
        disableButton(progress.newChecked, setDisabled);
      }
    }
  }, [drink]);

  const requestDetails = async () => {
    if (pathname.includes('/drinks')) {
      const drinkData = await fetchDrinksById(id);
      const drinkItem = drinkData.drinks[0];
      const drinkEntries = ObjectEntries('strIngredient', drinkItem);
      const checksArr = [];
      drinkEntries[0].ingredients
        .forEach(() => {
          checksArr.push(false);
          // mealEntries[0].checked = checksArr;
          setChecked(checksArr);
        });
      setDrink([drinkItem]);
      setDrinkIngredients(drinkEntries);
    }
  };

  const handleInputChange = (indice) => {
    const newChecked = [...checked];
    newChecked[indice] = !newChecked[indice];
    setChecked(newChecked);
    disableButton(newChecked, setDisabled);
    const progressData = getSavedProgress('inProgressRecipes');
    if (Object.keys(progressData).includes('drinks')) {
      let objLocalStorage;
      if (progressData.drinks.some((m) => m.id === id)) {
        const newProgressData = progressData.drinks.map((obj) => {
          if (obj.id === id) {
            return { ...obj, newChecked };
          }
          return obj;
        });
        objLocalStorage = {
          ...progressData,
          drinks: newProgressData,
        };
      } else {
        objLocalStorage = {
          ...progressData,
          drinks: [
            ...progressData.drinks,
            {
              id,
              newChecked,
            },
          ],
        };
      }
      saveProgress('inProgressRecipes', objLocalStorage);
    }
  };

  const handleClick = (recipe) => {
    const doneRcp = localStorage.getItem('doneRecipes') !== null
      ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
    const tags = recipe.strTags !== null ? recipe.strTags.split(',') : [];
    const newDoneRcp = [
      ...doneRcp,
      { id: recipe.idDrink,
        type: 'drink',
        nationality: recipe.strArea ? recipe.strArea : '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
        doneDate: new Date(Date.now()).toISOString(),
        tags,
      },
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRcp));
    history.push('/done-recipes');
  };

  useEffect(() => {
    requestDetails();
  }, []);
  return (
    <div
      style={ { paddingTop: '15px', paddingBottom: '30px' } }
    >
      {drink.length && drink.map((recipe, index) => (
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
          <div>
            {drinkIngredients.map(({ ingredients, measures }, index2) => (
              <div className="container" key={ `${ingredients[index2]} index2` }>
                <ListGroup>
                  {ingredients.map((ingredient, index3) => (
                    <ListGroupItem
                      key={ index3 }
                      data-testid={ `${index3}-ingredient-step` }
                      className={ checked[index3] ? 'checked' : '' }
                    >
                      <Form.Check
                        id={ `ingredient ${index3}` }
                        checked={ checked[index3] }
                        type="checkbox"
                        label={ `${ingredient} - ${measures[index3]}` }
                        onChange={ () => handleInputChange(index3) }
                      />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            ))}
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
          <Button
            value="Done Recipe"
            test="finish-recipe-btn"
            disabled={ disabled }
            className="btn-login btn-bottom"
            onClick={ () => handleClick(recipe) }
          />
        </div>
      ))}
    </div>
  );
}

DrinksInProgress.propTypes = {
  copied: PropTypes.bool.isRequired,
  meal: PropTypes.shape({
    length: PropTypes.func,
    map: PropTypes.func,
  }).isRequired,
  mealIngredients: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  // progress: PropTypes.bool.isRequired,
};
