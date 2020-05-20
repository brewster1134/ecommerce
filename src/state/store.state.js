import { createSelector } from 'reselect'

import StoreCategories from '../assets/store.categories.json'
import StoreCollections from '../assets/store.collections.json'
import StoreProducts from '../assets/store.products.json'

const INITIAL_STATE = {
  categories: StoreCategories,
  collections: StoreCollections,
  products: StoreProducts
}

// REDUCERS
//
export const storeReducer = (state = INITIAL_STATE, action) => {
  return state
}

// SELECTORS
//
const selectStore = (state) => state.store

const selectParams = (state, props) => props.match.params

export const selectCategories = createSelector(
  selectStore,
  (store) => store.categories
)

export const selectCollections = createSelector(
  selectStore,
  selectParams,
  (store, params) => store.collections[params.category]
)

export const selectProducts = createSelector(
  selectStore,
  selectParams,
  (store, params) => store.products[params.category][params.collection]
)
