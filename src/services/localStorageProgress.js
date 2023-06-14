export const getSavedProgress = (key) => {
  const recipesList = localStorage.getItem(key);
  return recipesList ? JSON.parse(recipesList) : {};
};

export const saveProgress = (key, obj) => {
  // const recipesList = getSavedRecipes(key);
  const newRecipesList = obj;
  localStorage.setItem(key, JSON.stringify(newRecipesList));
};

export const removeProgress = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');
  localStorage.removeItem(id);
  const recipesList = [...getSavedProgress()];
  const localizationObject = recipesList.map((element) => element.id);
  const indexProduct = localizationObject.indexOf(id);
  recipesList.splice(indexProduct, 1);
  localStorage.setItem(id, JSON.stringify(recipesList));
};
