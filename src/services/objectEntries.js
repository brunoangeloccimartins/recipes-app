export default function ObjectEntries(keyName, obj) {
  const ingredients = Object.entries(obj)
    .filter(([key, value]) => key.startsWith(keyName) && value !== '' && value !== null)
    .map(([, value]) => value);

  const measures = Object.entries(obj)
    .filter(([key, value]) => key
      .startsWith('strMeasure') && value !== ' ' && value !== null)
    .map(([, value]) => value);
  return [{
    ingredients,
    measures,
  }];
}
