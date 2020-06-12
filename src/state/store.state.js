import { createSelector } from 'reselect'

import actionTypes from './action-types'

const INITIAL_STATE = {
  categories: {},
  products: []
}

//
// ACTIONS
//
export const updateCategories = (categories) => ({
  type: actionTypes.store.UPDATE_CATEGORIES,
  payload: categories
})

export const updateProducts = (products) => ({
  type: actionTypes.store.UPDATE_PRODUCTS,
  payload: getCollectionSnapshotData(products)
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

    case actionTypes.store.UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.payload
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
  (categories, params) =>
    categories[params.category] ? categories[params.category].collections : []
)

export const selectProducts = createSelector(
  selectStore,
  selectParams,
  (store, params) => {
    return store.products.filter(
      (product) =>
        product.categories.includes(params.category) &&
        product.collections.includes(params.collection)
    )
  }
)

//
// UTILITIES
//
export const getCollectionSnapshotData = (collectionSnapshot) => {
  return collectionSnapshot.docs.map((docSnapshot) => {
    return {
      id: docSnapshot.id,
      ...docSnapshot.data()
    }
  })
}

// TODO: convert to async redux action
export const fetchCategories = async (categories) => {
  const fullCategories = await Promise.all(
    categories.map(async (category) => {
      // get the category data (minus the collections sub-collection)
      const catData = category.data()

      // get the category collections ref
      const catCollectionsRef = category.ref.collection('collections')

      // get the category collections
      const catCollections = await catCollectionsRef.get()

      // get the category collections data
      const catCollectionsData = getCollectionSnapshotData(catCollections)

      // set collections data to the rest of the category data
      catData.collections = catCollectionsData

      // return the full category data
      return catData
    })
  )

  return fullCategories.reduce((accumulator, item) => {
    accumulator[item['route']] = item
    return accumulator
  }, {})
}
