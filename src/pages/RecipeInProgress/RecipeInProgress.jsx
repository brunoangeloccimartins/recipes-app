import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import MealsInProgress from './MealsInProgress';
import DrinksInProgress from './DrinksInProgress';
import useFavoriteRecipe from '../../services/hooks/useFavoriteRecipe';

export default function RecipeInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();
  const { verifyFavorites } = useFavoriteRecipe();

  useEffect(() => {
    verifyFavorites(id);
  }, []);

  return (
    <div>
      {pathname === `/meals/${id}/in-progress`
        ? (<MealsInProgress />)
        : (<DrinksInProgress />)}
    </div>
  );
}
