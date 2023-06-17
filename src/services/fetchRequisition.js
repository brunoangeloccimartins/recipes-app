const fetchDataRequisition = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchMeals = (ingrediente) => fetchDataRequisition(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);

export const fetchMealsByCategory = (category) => fetchDataRequisition(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

export const fetchMealsByName = (name) => fetchDataRequisition(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);

export const fetchMealsByFirstLetter = (firstLetter) => fetchDataRequisition(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);

export const fetchMealsById = (id) => fetchDataRequisition(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

export const fetchDrinks = (ingrediente) => fetchDataRequisition(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);

export const fetchDrinksByCategory = (category) => fetchDataRequisition(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

export const fetchDrinksByName = (name) => fetchDataRequisition(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

export const fetchDrinksByFirstLetter = (firstLetter) => fetchDataRequisition(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);

export const fetchDrinksById = (id) => fetchDataRequisition(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

export const fetchByCountry = (country) => (
  fetchDataRequisition(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`));

export const fetchRecipe = (url) => fetchDataRequisition(url);
