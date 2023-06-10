import { combineReducers } from 'redux';
import searchBar from './reducer/searchBarReducer';

const rootReducer = combineReducers({ searchBar });

export default rootReducer;
