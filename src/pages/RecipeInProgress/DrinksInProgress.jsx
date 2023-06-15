/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchDrinksById } from '../../services/fetchRequisition';
import ObjectEntries from '../../services/objectEntries';
import Button from '../../components/Button';
import '../../styles/RecipeInProgress.css';
import { getSavedProgress, saveProgress } from '../../services/localStorageProgress';

export default function DrinksInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const { location: { pathname } } = history;
  const [disabled, setDisabled] = useState(true);
  const [checked, setChecked] = useState([]);
  const [drink, setDrink] = useState({});
  const [drinkIngredients, setDrinkIngredients] = useState([]);

  useEffect(() => {
    const savedProgress = getSavedProgress('inProgressRecipes');
    if (Object.keys(savedProgress.drinks).length > 0 && savedProgress.drinks) {
      setChecked(savedProgress.drinks[id]);
    }
  }, [drink]);

  const requestDetails = async () => {
    if (pathname.includes('/drinks')) {
      const drinkData = await fetchDrinksById(id);
      const drinkItem = drinkData.drinks[0];
      drinkItem.checked = false;
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
    const everyTrue = newChecked.every((check) => check === true);
    if (everyTrue) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    const progressData = getSavedProgress('inProgressRecipes');
    if (Object.keys(progressData).includes('drinks')) {
      const objLocalStorage = {
        ...progressData,
        drinks: {
          ...progressData.drinks,
          [id]: newChecked,
        },
      };
      saveProgress('inProgressRecipes', objLocalStorage);
    }
  };

  const doneDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}/${month + 1}/${year}`;
  };

  const handleClick = (recipe) => {
    const doneRcp = localStorage.getItem('doneRecipes') !== null
      ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
    const newDoneRcp = [
      ...doneRcp,
      { id: recipe.idDrink,
        type: 'drink',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
        doneDate: doneDate(),
        tags: recipe.strTags,
      },
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRcp));
    history.push('/done-recipes');
  };

  useEffect(() => {
    requestDetails();
  }, []);

  return (
    <div>
      {drink.length && drink.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{recipe.strDrink}</p>
          <p data-testid="recipe-category">{recipe.strCategory}</p>
          <Button value="Share" test="share-btn" />
          <Button value="Favorite" test="favorite-btn" />
          <div>
            {drinkIngredients.map(({ ingredients, measures }, index2) => (
              <ol key={ index2 }>
                {ingredients.map((ingredient, index3) => (
                  <li
                    key={ index3 }
                    data-testid={ `${index3}-ingredient-step` }
                    className={ checked[index3] ? 'checked' : '' }
                  >
                    <input
                      id={ `ingredient ${index3}` }
                      checked={ checked[index3] }
                      type="checkbox"
                      value={ `${ingredient} - ${measures[index3]}` }
                      onChange={ () => handleInputChange(index3) }
                    />
                    <label htmlFor={ `ingredient ${index3}` }>
                      {ingredient}
                      {' '}
                      -
                      {measures[index3]}
                    </label>
                  </li>
                ))}
              </ol>
            ))}
          </div>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
          <Button
            value="Done Recipe"
            test="finish-recipe-btn"
            disabled={ disabled }
            className="btn-bottom"
            onClick={ () => handleClick(recipe) }
          />
        </div>
      ))}
    </div>
  );
}
