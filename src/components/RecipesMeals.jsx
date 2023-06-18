/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2';
import useFetch from '../services/hooks/useFetch';
import { fetchRecipe,
  fetchMealsByCategory,
  fetchMeals,
  fetchMealsByName,
  fetchMealsByFirstLetter,
  fetchByCountry,
} from '../services/fetchRequisition';
import Button from './Button';
import '../styles/Recipes.css';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectFilter from './SelectFilter';

function RecipesMeals() {
  const [recipesMeals, setRecipesMeals] = useState({});
  const [recipesMealsByCategories, setRecipesMealsByCategories] = useState([]);
  const [category, setCategory] = useState('All');
  const { fetchData } = useFetch();
  const { searchValue, radioValue,
    isHidden,
    selectedCountry } = useSelector((rootReducer) => rootReducer
    .searchBar);
  const history = useHistory();
  const fetchSearchs = async () => {
    const URLmeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    switch (radioValue) {
    case '':
      await fetchData(fetchRecipe(URLmeals), setRecipesMeals);
      break;
    case 'ingredient':
      await fetchData(fetchMeals(searchValue), setRecipesMeals);
      break;
    case 'name':
      await fetchData(fetchMealsByName(searchValue), setRecipesMeals);
      break;
    default:
      await fetchData(fetchMealsByFirstLetter(searchValue), setRecipesMeals);
      break;
    }
  };

  const renderCondition = () => {
    if (recipesMeals.meals !== undefined) {
      if (recipesMeals.meals === null) {
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
      if (recipesMeals.meals.length === 1
        && recipesMeals.meals !== null
        && recipesMeals.meals[0].strMeal !== 'Mbuzi Choma (Roasted Goat)'
      ) {
        history.push(`/meals/${recipesMeals.meals[0].idMeal}`);
      }
    }
  };

  const fetchRecipesByMeals = async () => {
    const URLmeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    await fetchData(fetchRecipe(URLmeals), setRecipesMeals);
  };

  const fetchRecipesByMealsByCategories = async () => {
    const URLmeals = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const response = await fetchRecipe(URLmeals);
    const modifiedData = [{ strCategory: 'All' }, ...response.meals];
    setRecipesMealsByCategories(modifiedData);
  };

  const filterByMeals = async (categories) => {
    const recipesMealsByCategory = fetchMealsByCategory(categories);
    await fetchData(recipesMealsByCategory, setRecipesMeals);
  };

  const filterByCountryCulture = async () => {
    if (selectedCountry !== 'All') {
      const mealsByCountry = fetchByCountry(selectedCountry);
      return fetchData(mealsByCountry, setRecipesMeals);
    }
    return fetchRecipesByMeals();
  };

  const toggleFilter = (categories) => {
    setCategory(categories);
    if (categories === category) {
      setCategory(categories);
    }

    if (categories === 'All' || category === categories) {
      fetchRecipesByMeals();
    } else {
      filterByMeals(categories);
    }
  };
  useEffect(() => {
    if (selectedCountry !== 'Search by country') {
      filterByCountryCulture();
    }
  }, [selectedCountry]);

  useEffect(() => {
    renderCondition();
  }, [recipesMeals]);

  useEffect(() => {
    // fetchRecipesByMeals();
    fetchRecipesByMealsByCategories();
    fetchSearchs();
    // renderCondition();
  }, [searchValue]);

  return (
    <section
      style={ { paddingBottom: '40px' } }
      className={ !isHidden ? 'page-recipe-meals'
        : 'page-recipe-meals padding-top' }
    >
      <div className="page-title">
        <h1
          className="h1"
        >
          Meals
        </h1>
      </div>

      <div className="icons-categories">
        {recipesMealsByCategories !== undefined
          && recipesMealsByCategories.map((recipe, index) => {
            const maxCategories = 5;
            const classNames = [
              'btn-category-all',
              'btn-category-beef',
              'btn-category-breakfast',
              'btn-category-chicken',
              'btn-category-dessert',
              'btn-category-goat',
            ];
            if (index <= maxCategories) {
              return (
                <div
                  key={ recipe.strCategory }
                  className="btn-categories"
                >
                  <Button
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
                </div>
              );
            }
            return null;
          })}
      </div>
      <div className="category-select-by-country">
        <SelectFilter />
        { selectedCountry !== 'All' && selectedCountry !== 'Search by country'
        && (
          <p>{ `Results for ${selectedCountry} food` }</p>
        )}
      </div>
      <div className="container div-cards">
        {recipesMeals.meals
            && recipesMeals.meals.map((recipe, index) => {
              const maxRecipes = 11;
              if (index <= maxRecipes) {
                return (
                  <div className="recipe-card" key={ recipe.idMeal }>
                    <Card style={ { width: '18rem', marginBottom: '30px' } }>
                      <Card.Img
                        variant="top"
                        src={ recipe.strMealThumb }
                        alt={ recipe.strMeal }
                        data-testid={ `${index}-card-img` }
                      />
                      <Card.Body>
                        <Card.Title
                          style={ { height: '70px', overflowY: 'hidden' } }
                        >
                          {recipe.strMeal}
                        </Card.Title>

                        <Button
                          className="btn-login btn-card"
                          value={
                            <Link
                              to={ `/meals/${recipe.idMeal}` }
                            >
                              View Recipe
                            </Link>
                          }
                        />
                      </Card.Body>
                    </Card>
                  </div>
                );
              }
              return null;
            })}
      </div>
    </section>
  );
}

export default RecipesMeals;
