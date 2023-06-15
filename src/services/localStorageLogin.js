export const getSavedUser = (key) => {
  const recipesList = localStorage.getItem(key);
  return recipesList ? JSON.parse(recipesList) : {};
};

export const saveUser = (key, obj) => {
  // const recipesList = getSavedRecipes(key);
  localStorage.setItem(key, JSON.stringify(obj));
};

export const removeUser = (key) => {
  if (!key) throw new Error('Você deve fornecer uma chave válida');
  localStorage.clear(key);
  // const recipesList = [...getSavedProgress()];
  // const localizationObject = recipesList.map((element) => element.id);
  // const indexProduct = localizationObject.indexOf(id);
  // recipesList.splice(indexProduct, 1);
  // localStorage.setItem(id, JSON.stringify(recipesList));
};
