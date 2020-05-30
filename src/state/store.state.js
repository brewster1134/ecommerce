import { createSelector } from 'reselect'

import actionTypes from './action-types'

import StoreCollections from '../assets/store.collections.json'
import StoreProducts from '../assets/store.products.json'

const INITIAL_STATE = {
  categories: [],
  collections: StoreCollections,
  products: StoreProducts
}

//
// ACTIONS
//
export const updateCategories = (categories) => ({
  type: actionTypes.store.UPDATE_CATEGORIES,
  payload: categories
})

//
// REDUCERS
//
export const storeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.store.UPDATE_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }

    default:
      return state
  }
}

//
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
