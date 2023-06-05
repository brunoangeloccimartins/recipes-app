import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </main>
  );
}

export default App;
