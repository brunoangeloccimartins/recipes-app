/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2';
import useFetch from '../services/hooks/useFetch';
import { fetchRecipe,
  fetchDrinksByCategory,
  fetchDrinks,
  fetchDrinksByName,
  fetchDrinksByFirstLetter,
} from '../services/fetchRequisition';
import Button from './Button';
import '../styles/App.css';
import '../styles/Recipes.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecipesDrinks() {
  const [recipesDrinks, setRecipesDrinks] = useState({});
  const [recipesDrinksByCategories, setRecipesDrinksByCategories] = useState([]);
  const [category, setCategory] = useState('All');
  const { searchValue, radioValue, isHidden } = useSelector((rootReducer) => rootReducer
    .searchBar);
  const { fetchData } = useFetch();
  const history = useHistory();

  const fetchSearchs = async () => {
    const URLdrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    switch (radioValue) {
    case '':
      await fetchData(fetchRecipe(URLdrinks), setRecipesDrinks);
      break;
    case 'ingredient':
      await fetchData(fetchDrinks(searchValue), setRecipesDrinks);
      break;
    case 'name':
      await fetchData(fetchDrinksByName(searchValue), setRecipesDrinks);
      break;
    default:
      console.log('entrei no default');
      await fetchData(fetchDrinksByFirstLetter(searchValue), setRecipesDrinks);
      break;
    }
  };

  const fetchRecipesByDrinks = async () => {
    const URLdrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    await fetchData(fetchRecipe(URLdrinks), setRecipesDrinks);
  };

  const fetchRecipesByDrinksByCategories = async () => {
    const URLdrinks = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetchRecipe(URLdrinks);
    const modifiedData = [{ strCategory: 'All' }, ...response.drinks];
    setRecipesDrinksByCategories(modifiedData);
  };

  const filterByDrinks = async (categories) => {
    const recipesDrinksByCategory = fetchDrinksByCategory(categories);
    await fetchData(recipesDrinksByCategory, setRecipesDrinks);
  };

  const renderCondition = () => {
    if (recipesDrinks.drinks !== undefined) {
      if (recipesDrinks.drinks === null) {
        return Swal.fire({
          title: 'Sorry',
          text: 'we haven\'t found any recipes for these filters.',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
      }
      if (recipesDrinks.drinks.length === 1 && recipesDrinks.drinks !== null) {
        history.push(`/drinks/${recipesDrinks.drinks[0].idDrink}`);
      }
    }
  };

  useEffect(() => {
    renderCondition();
  }, [recipesDrinks]);

  useEffect(() => {
    fetchSearchs();
    fetchRecipesByDrinksByCategories();
  }, [searchValue]);

  const toggleFilter = (categories) => {
    setCategory(categories);
    if (categories === category) {
      setCategory(categories);
    }

    if (categories === 'All' || category === categories) {
      fetchRecipesByDrinks();
    } else {
      filterByDrinks(categories);
    }
  };

  return (
    <div
      style={ { paddingBottom: '40px' } }
      className={ !isHidden ? 'page-recipe-drinks'
        : 'page-recipe-drinks padding-top' }
    >
      <div className="page-title">
        <h1
          data-testid="page-title"
        >
          Drinks
        </h1>
      </div>
      <div>
        <div className="icons-categories">
          {recipesDrinksByCategories !== undefined
          && recipesDrinksByCategories.map((recipe, index) => {
            const maxCategories = 5;
            const classNames = [
              'btn-category-all-drinks',
              'btn-category-ordinary',
              'btn-category-cocktail',
              'btn-category-shake',
              'btn-category-other',
              'btn-category-cocoa',
            ];
            if (index <= maxCategories) {
              return (
                <Button
                  key={ recipe.strCategory }
                  value={
                    <div className={ classNames[index] }>
                      <div>{ recipe.strCategory }</div>
                    </div>
                  }
                  test={ recipe.strCategory !== 'All'
                    ? `${recipe.strCategory}-category-filter`
                    : 'All-category-filter' }
                  onClick={ () => toggleFilter(recipe.strCategory) }
                  className="btn-category"
                />
              );
            }
            return null;
          })}
        </div>
        <div className="container div-cards">
          {recipesDrinks.drinks
            && recipesDrinks.drinks.map((recipe, index) => {
              const maxRecipes = 11;
              if (index <= maxRecipes) {
                return (
                  <div className="recipe-card" key={ recipe.idMeal }>
                    <Card style={ { width: '18rem' } }>
                      <Card.Img
                        variant="top"
                        src={ recipe.strDrinkThumb }
                        alt={ recipe.strDrink }
                      />
                      <Card.Body>
                        <Card.Title
                          style={ { height: '80px' } }
                        >
                          {recipe.strDrink}
                        </Card.Title>

                        <Button
                          className="btn-login btn-card"
                          value={
                            <Link
                              to={ `/drinks/${recipe.idDrink}` }
                            >
                              View Recipe
                            </Link>
                          }
                        />
                      </Card.Body>
                    </Card>
                  </div>
                  // <div
                  //   data-testid={ `${index}-recipe-card` }
                  //   key={ recipe.idDrink }
                  //   className="recipe-card"
                  // >
                  //   <Link
                  //     to={ `/drinks/${recipe.idDrink}` }
                  //   >
                  //     <img
                  //       src={ recipe.strDrinkThumb }
                  //       alt={ recipe.strDrink }
                  //       data-testid={ `${index}-card-img` }
                  //     />
                  //     <h2
                  //       data-testid={ `${index}-card-name` }
                  //     >
                  //       {recipe.strDrink}
                  //     </h2>
                  //   </Link>
                  // </div>
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
}

export default RecipesDrinks;
