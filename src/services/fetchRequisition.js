const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchMeals = (ingrediente) => fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);

export const fetchMealsByCategory = (category) => fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

export const fetchMealsById = (id) => fetchData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

export const fetchDrinks = (ingrediente) => fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);

export const fetchDrinksByCategory = (category) => fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

export const fetchDrinksById = (id) => fetchData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

export const fetchRecipe = (url) => fetchData(url);
