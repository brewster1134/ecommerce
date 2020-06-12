import { createSelector } from 'reselect'

import actionTypes from './action-types'

import StoreProducts from '../assets/store.products.json'

const INITIAL_STATE = {
  categories: {},
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
  selectCategories,
  selectParams,
  (categories, params) => categories[params.category].collections
)

export const selectProducts = createSelector(
  selectStore,
  selectParams,
  (store, params) => store.products[params.category][params.collection]
)

//
// UTILITIES
//
const mapCollectionBy = (collection, key = 'route') => {
  return collection.reduce((accumulator, item) => {
    accumulator[item[key]] = item
    return accumulator
  }, {})
}

export const fetchCategories = async (categories) => {
  const fullCats = await Promise.all(
    categories.map(async (category) => {
      // get the category data (minus the collections sub-collection)
      const catData = category.data()

      // get the category collections ref
      const catCollectionsRef = category.ref.collection('collections')

      // get the category collections
      const catCollections = await catCollectionsRef.get()

      // get the category collections data
      const catCollectionsData = catCollections.docs.map((collection) =>
        collection.data()
      )

      // set collections data to the rest of the category data
      catData.collections = catCollectionsData

      // return the full category data
      return catData
    })
  )

  return mapCollectionBy(fullCats)
}
