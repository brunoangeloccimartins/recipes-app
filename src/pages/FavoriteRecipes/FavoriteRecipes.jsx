import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '../../components/Button';
import Header from '../../components/Header/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { getLocalStorageItem } from '../../services/localStorageUtil';

function FavoriteRecipes() {
  const [recipesFav, setRecipesFav] = useState([]);
  const [copied, setCopied] = useState(false);
  const [selectedFilter, setFilter] = useState('all');
  const testLocalStorage = () => {
    const favoriteRecipes = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  const handleCopy = (type, id) => {
    let textToCopy;
    const countTimeOut = 3000;

    if (type === 'drink') {
      textToCopy = `http://localhost:3000/drinks/${id}`;
    }
    textToCopy = `http://localhost:3000/meals/${id}`;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, countTimeOut);
        console.log('Link copied!');
      })
      .catch((error) => {
        console.error('Erro ao copiar o texto:', error);
      });
  };

  const handleRemove = (id) => {
    const favRecipesData = getLocalStorageItem('favoriteRecipes');

    const newFavRecipes = favRecipesData.filter((recipe) => recipe.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipes));
    setRecipesFav(newFavRecipes);
  };

  useEffect(() => {
    testLocalStorage();
    const favRecipes = localStorage.getItem('favoriteRecipes');
    if (favRecipes !== null) {
      setRecipesFav(JSON.parse(favRecipes));
    }
  }, []);

  return (
    <div>
      <Header />
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
                  { copied && <p>Link copied!</p>}
                </div>
              ))}
          </section>
        )}
    </div>
  );
}

export default FavoriteRecipes;
