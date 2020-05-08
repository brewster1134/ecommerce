import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'

// collect reducers
import { userReducer } from './user.redux'
export const rootReducer = combineReducers({
  user: userReducer
})

// create store
const middleware = [logger]
export const store = createStore(rootReducer, applyMiddleware(...middleware))
