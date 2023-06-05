import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Recipes from './pages/Recipes/Recipes';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/meals/:id" component={ Recipes } />
        <Route path="/drinks/:id" component={ Recipes } />
        <Route path="/meals/:id/in-progress" component={ Recipes } />
        <Route path="/drinks/:id/in-progress" component={ Recipes } />
        <Route path="/profile" component={ Recipes } />
        <Route path="/done-recipes" component={ Recipes } />
        <Route path="/favorite-recipes" component={ Recipes } />
      </Switch>
    </main>
  );
}

export default App;
