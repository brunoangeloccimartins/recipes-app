import { combineReducers } from 'redux';
import searchBar from './reducer/searchBarReducer';
import recipeDetails from './reducer/recipeDetailsReducer';
import recipesReducer from './reducer/recipesReducer';

const rootReducer = combineReducers({ searchBar, recipeDetails, recipesReducer });

export default rootReducer;
