import { combineReducers } from 'redux';
import { portfolioReducer } from './portfolio-reducer.js';

const rootReducer = combineReducers({ portfolioReducer});

export default rootReducer;