import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '../../components/Button';
import Header from '../../components/Header/Header';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipes() {
  const [recipesDone, setRecipesFav] = useState([]);
  const [copied, setCopied] = useState(false);
  const [selectedFilter, setFilter] = useState('all');
  const testLocalStorage = () => {
    const doneRecipes = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
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
  useEffect(() => {
    testLocalStorage();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setRecipesFav(doneRecipes);
  }, []);
  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setRecipesFav(doneRecipes);
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
      { recipesDone.length
&& (
  <section>
    { recipesDone.filter((recipe) => {
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
            {recipe.doneDate}
          </p>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { recipe.type !== 'drink'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot}`}
          </p>
          {recipe.tags.length && recipe.tags.map((tag) => (
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
          { copied && <p>Link copied!</p>}
        </div>
      ))}
  </section>
)}
    </div>
  );
}
export default DoneRecipes;
