import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { getLocalStorageItem } from '../../services/localStorageUtil';
import useHandleCopy from '../../services/hooks/useHandleCopy';

function FavoriteRecipes() {
  const [recipesFav, setRecipesFav] = useState([]);
  const [selectedFilter, setFilter] = useState('all');
  const { isCopied } = useSelector((rootReducer) => rootReducer.recipeDetails);
  const handleCopy = useHandleCopy();

  const handleRemove = (id) => {
    const favRecipesData = getLocalStorageItem('favoriteRecipes');

    const newFavRecipes = favRecipesData.filter((recipe) => recipe.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipes));
    setRecipesFav(newFavRecipes);
  };

  useEffect(() => {
    // testLocalStorage();
    const favRecipes = localStorage.getItem('favoriteRecipes');
    if (favRecipes !== null && favRecipes !== undefined) {
      try {
        setRecipesFav(JSON.parse(favRecipes));
      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    }
  }, []);

  return (
    <div>
      <Header />
      { !recipesFav.length
        ? (<p>{'You haven\'t favorited any recipes yet'}</p>)
        : (
          <div>
            { isCopied && <p>Link copied!</p>}
            <Button
              value="All"
              test="filter-by-all-btn"
              onClick={ () => setFilter('all') }
            />
            <Button
              value="Meals"
              test="filter-by-meal-btn"
              onClick={ () => setFilter('meal') }
            />
            <Button
              value="Drinks"
              test="filter-by-drink-btn"
              onClick={ () => setFilter('drink') }
            />

            { recipesFav.length
  && (
    <section>
      { recipesFav.filter((recipe) => {
        if (selectedFilter === 'all') {
          return true;
        }
        return recipe.type === selectedFilter;
      })
        .map((recipe, index) => (
          <div key={ index }>
            <Link
              to={ recipe.type === 'drink'
                ? `/drinks/${recipe.id}`
                : `/meals/${recipe.id}` }
            >
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              <img
                src={ recipe.image }
                alt=""
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.type !== 'drink'
                ? `${recipe.nationality} - ${recipe.category}`
                : `${recipe.alcoholicOrNot}`}

            </p>
            <Button
              value={
                <img
                  src={ shareIcon }
                  alt="Compartilhar"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              }
              onClick={ () => handleCopy(recipe.type, recipe.id) }
            />
            <Button
              value={
                <img
                  src={ blackHeartIcon }
                  alt="Favoritar"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              }
              onClick={ () => handleRemove(recipe.id) }
            />
          </div>
        ))}
    </section>
  )}
          </div>
        )}
    </div>
  );
}

export default FavoriteRecipes;
