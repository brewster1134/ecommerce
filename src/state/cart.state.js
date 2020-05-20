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

export const clearCart = () => ({
  type: actionTypes.cart.CLEAR_CART,
  payload: null
})

export const removeProduct = (product) => ({
  type: actionTypes.cart.REMOVE_PRODUCT,
  payload: product
})

export const subtractProduct = (product) => ({
  type: actionTypes.cart.SUBTRACT_PRODUCT,
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
    case actionTypes.cart.ADD_PRODUCT:
      return {
        ...state,
        products: addProductQuantity(state.products, action.payload)
      }

    case actionTypes.cart.CLEAR_CART:
      return {
        ...state,
        products: []
      }

    case actionTypes.cart.REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        )
      }

    case actionTypes.cart.SUBTRACT_PRODUCT:
      return {
        ...state,
        products: removeProductQuantity(state.products, action.payload)
      }

    case actionTypes.cart.TOGGLE_DROPDOWN:
      const visible =
        action.payload === undefined ? !state.dropdownVisible : action.payload

      return {
        ...state,
        dropdownVisible: visible
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

const removeProductQuantity = (existingProducts, productToRemove) => {
  // find product
  const existingProduct = existingProducts.find(
    (product) => product.id === productToRemove.id
  )

  // if only 1 in cart, remove entire product
  if (existingProduct.quantity === 1) {
    return existingProducts.filter(
      (product) => product.id !== productToRemove.id
    )

    // if more than 1 in cart, just remove 1
  } else {
    return existingProducts.map((product) =>
      product.id === productToRemove.id
        ? { ...product, quantity: product.quantity - 1 }
        : product
    )
  }
}
