import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'

// collect reducers
import { userReducer } from './user.redux'
export const rootReducer = combineReducers({
  user: userReducer
})

// action types
export const actionTypes = {
  user: {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
  }
}

// create store
const middleware = [logger]
export const store = createStore(rootReducer, applyMiddleware(...middleware))
