import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '../../components/Button';
import Header from '../../components/Header/Header';
import shareIcon from '../../images/shareIcon.svg';
import { getSavedRecipes } from '../../services/favoriteRecipesLocal';
import useHandleCopy from '../../services/hooks/useHandleCopy';

function DoneRecipes() {
  const [recipesDone, setRecipesDone] = useState([]);
  const [selectedFilter, setFilter] = useState('all');
  const handleCopy = useHandleCopy();
  const { isCopied } = useSelector((rootReducer) => rootReducer.recipeDetails);

  useEffect(() => {
    const doneRecipes = getSavedRecipes('doneRecipes');
    if (doneRecipes !== '[]' && doneRecipes !== null) {
      try {
        setRecipesDone(JSON.parse(doneRecipes));
      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    }
  }, []);

  return (
    <div>
      <Header />
      { !recipesDone.length
        ? (<p>{'You haven\'t done any recipes yet'}</p>)
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

            { recipesDone.length
            && (
              <section>
                {recipesDone.length && recipesDone.filter((recipe) => {
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
                        data-testid={ `${index}-horizontal-done-date` }
                      >
                        {new Date(recipe.doneDate).toLocaleDateString()}
                      </p>
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        { recipe.type !== 'drink'
                          ? `${recipe.nationality} - ${recipe.category}`
                          : `${recipe.alcoholicOrNot}`}
                      </p>
                      {recipe.tags.length > 0 && recipe.tags.map((tag) => (
                        <span
                          key={ tag }
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                        >
                          #
                          {tag}
                          {' '}
                        </span>
                      ))}
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
                    </div>
                  ))}
              </section>
            )}
          </div>
        )}
    </div>
  );
}
export default DoneRecipes;
