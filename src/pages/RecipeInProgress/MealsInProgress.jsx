/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchMealsById } from '../../services/fetchRequisition';
import ObjectEntries from '../../services/objectEntries';
import Button from '../../components/Button';
import '../../styles/RecipeInProgress.css';
import { getSavedProgress, saveProgress } from '../../services/localStorageProgress';

export default function MealsInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const { location: { pathname } } = history;
  const [disabled, setDisabled] = useState(true);
  const [checked, setChecked] = useState([]);
  const [meal, setMeal] = useState({});
  const [mealIngredients, setMealIngredients] = useState([]);

  useEffect(() => {
    const savedProgress = getSavedProgress('inProgressRecipes');
    if (Object.keys(savedProgress.meals).length > 0 && savedProgress.meals) {
      setChecked(savedProgress.meals[id]);
    }
  }, [meal]);

  const requestDetails = async () => {
    if (pathname.includes('/meals')) {
      const mealData = await fetchMealsById(id);
      const mealItem = mealData.meals[0];
      console.log(mealItem, 'mealItem');
      const mealEntries = ObjectEntries('strIngredient', mealItem);
      const checksArr = [];
      mealEntries[0].ingredients
        .forEach(() => {
          checksArr.push(false);
          setChecked(checksArr);
        });
      setMeal([mealItem]);
      setMealIngredients(mealEntries);
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
    if (Object.keys(progressData).includes('meals')) {
      const objLocalStorage = {
        ...progressData,
        meals: {
          ...progressData.meals,
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

  console.log(doneDate());

  const handleClick = (recipe) => {
    const doneRcp = localStorage.getItem('doneRecipes') !== null
      ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
    const newDoneRcp = [
      ...doneRcp,
      { id: recipe.idMeal,
        type: 'meal',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
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
    <main>
      {meal.length && meal.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{recipe.strMeal}</p>
          <p data-testid="recipe-category">{recipe.strCategory}</p>
          <Button value="Share" test="share-btn" />
          <Button value="Favorite" test="favorite-btn" />
          <div>
            { mealIngredients.map(({ ingredients, measures }, index2) => (
              <ol key={ `${ingredients[index2]} index2` }>
                {ingredients.map((ingredient, index3) => (
                  <li
                    key={ `${ingredient} index3` }
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
            className="btn-login btn-bottom"
            onClick={ () => handleClick(recipe) }
          />
        </div>
      ))}
    </main>
  );
}
