export function clearLocalStorageItem(key, item) {
  const storedData = localStorage.getItem(key);
  const treatedData = storedData !== null ? JSON.parse(storedData) : [];

  if (!item) {
    return localStorage.clear(key);
  }
  if (treatedData.length > 1) {
    const removeItem = treatedData.filter((dataItem) => dataItem !== item);
    return localStorage.setItem(key, JSON.stringify(removeItem));
  }
}

export function getLocalStorageItem(key) {
  const storedData = localStorage.getItem(key);
  return storedData !== null ? JSON.parse(storedData) : [];
}
