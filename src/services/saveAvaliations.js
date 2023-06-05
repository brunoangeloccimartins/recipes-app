export const getSavedAvaliations = (id) => {
  const cartProducts = localStorage.getItem(id);
  return cartProducts ? JSON.parse(cartProducts) : [];
};

export const saveAvaliations = (id, obj) => {
  const cartProducts = getSavedAvaliations(id);
  const newCartProducts = [...cartProducts, obj];
  localStorage.setItem(id, JSON.stringify(newCartProducts));
};

export const removeAvaliations = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');
  localStorage.removeItem(id);
  // const cartProducts = [...getSavedAvaliations()];
  // const test = cartProducts.map((element) => element.id);
  // const indexProduct = test.indexOf(id);
  // cartProducts.splice(indexProduct, 1);
  // localStorage.setItem(id, JSON.stringify(cartProducts));
};
