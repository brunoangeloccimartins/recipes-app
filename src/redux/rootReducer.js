import { combineReducers } from 'redux';
import login from './reducer/loginReducer';

const rootReducer = combineReducers({ login });

export default rootReducer;
