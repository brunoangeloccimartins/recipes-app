import React from 'react';
import './styles/App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Recipes from './pages/Recipes/Recipes';
import Profile from './pages/Profile/Profile';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress/RecipeInProgress';
import cookItSimple from './images/backgrounds/Crop_Cook-it-Simple.svg';

function App() {
  return (
    <>
      <div className="message-container">
        <div>
          <img src={ cookItSimple } alt="" />
        </div>
        <p className="message">
          The desktop version is under development.
          For a better experience, please access it using your smartphone. 🥰
        </p>
      </div>
      <main>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route exact path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
          <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/profile" component={ Profile } />
        </Switch>
      </main>
    </>
  );
}

export default App;
