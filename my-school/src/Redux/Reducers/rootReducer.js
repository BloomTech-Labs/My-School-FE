import { combineReducers } from 'redux';
import { portfolioReducer } from './portfolio-reducer.js';
import { usersReducer } from './reducers-users.js';

const rootReducer = combineReducers({ portfolioReducer, usersReducer});

export default rootReducer;