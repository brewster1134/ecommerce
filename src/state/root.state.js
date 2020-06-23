import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import { appReducer } from './app.state'
import { cartReducer } from './cart.state'
import { storeReducer } from './store.state'
import { userReducer } from './user.state'

//
// REDUCERS
//
const rootReducer = combineReducers({
  app: appReducer,
  cart: cartReducer,
  store: storeReducer,
  user: userReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'store']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

//
// STORE
//
const middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
)

export const persistor = persistStore(store)
