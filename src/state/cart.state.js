import { createSelector } from 'reselect'

import actionTypes from './action-types'

const INITIAL_STATE = {
  dropdownVisible: false,
  products: []
}

// ACTIONS
//
export const addProduct = (product) => ({
  type: actionTypes.cart.ADD_PRODUCT,
  payload: product
})

export const toggleDropdown = (visible) => ({
  type: actionTypes.cart.TOGGLE_DROPDOWN,
  payload: visible
})

// REDUCER
//
export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.cart.TOGGLE_DROPDOWN:
      const visible =
        action.payload === undefined ? !state.dropdownVisible : action.payload

      return {
        ...state,
        dropdownVisible: visible
      }
    case actionTypes.cart.ADD_PRODUCT:
      return {
        ...state,
        products: addProductQuantity(state.products, action.payload)
      }

    default:
      return state
  }
}

// SELECTORS
//
const selectCart = (state) => state.cart

export const selectProducts = createSelector(
  selectCart,
  (cart) => cart.products
)

export const selectCartQuantity = createSelector(selectProducts, (products) =>
  products.reduce(
    (totalQuantity, product) => totalQuantity + product.quantity,
    0
  )
)

export const selectCartTotal = createSelector(selectProducts, (products) =>
  products.reduce(
    (totalCost, product) => totalCost + product.price * product.quantity,
    0
  )
)

export const selectDropdownVisible = createSelector(
  selectCart,
  (cart) => cart.dropdownVisible
)

// UTILITIES
//
const addProductQuantity = (existingProducts, newProduct) => {
  // check if product has already been added to the cart
  const existingProduct = existingProducts.find(
    (product) => product.id === newProduct.id
  )

  // if product already exists, increase the quantity
  if (existingProduct) {
    return existingProducts.map((product) =>
      product.id === newProduct.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    )
  }

  // if product does not exist, set the quantity to 1
  return [...existingProducts, { ...newProduct, quantity: 1 }]
}
