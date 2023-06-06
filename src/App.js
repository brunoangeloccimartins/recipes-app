import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Recipes from './pages/Recipes/Recipes';
import Profile from './components/Profile';
import Done from './components/Done';
import Favorites from './components/Favorites';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ Done } />
        <Route path="/favorite-recipes" component={ Favorites } />
      </Switch>
    </main>
  );
}

export default App;

// Rota "/meals/:id-da-receita": não deve ter footer
// Rota "/drinks/:id-da-receita": não deve ter footer
// Rota "/meals/:id-da-receita/in-progress": não deve ter footer
// Rota "/drinks/:id-da-receita/in-progress": não deve ter footer
