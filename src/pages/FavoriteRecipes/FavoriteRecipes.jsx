/* eslint-disable react/jsx-max-depth */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Card from 'react-bootstrap/Card';
import Button from '../../components/Button';
import Header from '../../components/Header/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { getLocalStorageItem } from '../../services/localStorageUtil';
import '../../styles/FavoriteRecipes.css';

function FavoriteRecipes() {
  const [recipesFav, setRecipesFav] = useState([]);
  const [copied, setCopied] = useState(false);
  const [selectedFilter, setFilter] = useState('all');

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
    <section>
      <Header />
      <div className="page-title">
        <h1
          data-testid="page-title"
        >
          Favorites
        </h1>
      </div>
      <section className="container-favorites-btns">

        <Button
          value={ <div className="container-btn-all">All</div> }
          test="filter-by-all-btn"
          onClick={ () => setFilter('all') }
        />

        <Button
          value={ <div className="container-btn-meals">Meals</div> }
          test="filter-by-meal-btn"
          onClick={ () => setFilter('meal') }
        />

        <Button
          value={ <div className="container-btn-drinks">Drinks</div> }
          test="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        />

      </section>
      { recipesFav.length
        && (
          <section className="container">
            { recipesFav.filter((recipe) => {
              if (selectedFilter === 'all') {
                return true;
              }
              return recipe.type === selectedFilter;
            })
              .map((recipe, index) => (
                <div
                  key={ index }
                  className="container container-cards-favorites"
                >
                  <Card
                    style={ {
                      width: '18rem',
                      marginTop: '0',
                    } }
                  >
                    <Card.Img
                      src={ recipe.image }
                      alt={ recipe.name }
                    />
                    <Card.Body>
                      <Card.Title>
                        <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                      </Card.Title>
                      <div className="container-btns-category">
                        <Card.Text>
                          { recipe.type !== 'drink'
                            ? `${recipe.nationality} - ${recipe.category}`
                            : `${recipe.alcoholicOrNot}`}
                        </Card.Text>

                        <div className="container-share-favorite-btns">
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

                      </div>
                      { copied && <p>Link copied!</p>}
                      <Button
                        className="btn-login btn-card"
                        value={
                          <Link
                            to={ recipe.type === 'drink'
                              ? `/drinks/${recipe.id}`
                              : `/meals/${recipe.id}` }
                          >
                            View Recipe
                          </Link>
                        }
                      />
                    </Card.Body>
                  </Card>
                </div>
              ))}
          </section>
        )}
    </section>
  );
}

export default FavoriteRecipes;
