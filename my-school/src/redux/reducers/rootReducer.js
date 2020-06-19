import {combineReducers} from 'redux'
import {portfolioReducer} from './portfolio-reducer'
import {usersReducer} from './users-reducer'

const rootReducer = combineReducers({ portfolioReducer, usersReducer});

export default rootReducer;