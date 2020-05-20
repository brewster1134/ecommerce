import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'

import { cartReducer } from './cart.state'
import { storeReducer } from './store.state'
import { userReducer } from './user.state'

// REDUCERS
//
const rootReducer = combineReducers({
  cart: cartReducer,
  store: storeReducer,
  user: userReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// STORE
//
const middleware = [logger]

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
)

export const persistor = persistStore(store)
