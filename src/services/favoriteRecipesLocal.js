export const getSavedRecipes = (key) => {
  const recipesList = localStorage.getItem(key);
  return recipesList ? JSON.parse(recipesList) : [];
};

export const saveRecipes = (key, obj) => {
  const recipesList = getSavedRecipes(key);
  const newRecipesList = [...recipesList, obj];
  localStorage.setItem(key, JSON.stringify(newRecipesList));
};

export const removeRecipe = (key, id) => {
  if (!id) throw new Error('Você deve fornecer um ID');
  // localStorage.removeItem(id);
  const recipesList = getSavedRecipes(key);
  const localizationObject = recipesList.map((element) => element.id);
  const indexProduct = localizationObject.indexOf(id);
  recipesList.splice(indexProduct, 1);
  localStorage.setItem(key, JSON.stringify(recipesList));
};
