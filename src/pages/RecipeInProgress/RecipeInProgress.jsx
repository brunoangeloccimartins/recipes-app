import React from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import MealsInProgress from './MealsInProgress';
import DrinksInProgress from './DrinksInProgress';

export default function RecipeInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();

  return (
    <div>
      {pathname === `/meals/${id}/in-progress`
        ? (<MealsInProgress />)
        : (<DrinksInProgress />)}
    </div>
  );
}
