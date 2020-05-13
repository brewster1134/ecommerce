import actionTypes from './action-types'

const INITIAL_STATE = {
  dropdownVisible: false,
  products: []
}

// reducer
export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.cart.TOGGLE_DROPDOWN:
      return {
        ...state,
        dropdownVisible: !state.dropdownVisible
      }
    case actionTypes.cart.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      }

    default:
      return state
  }
}

// actions
export const toggleDropdown = (cart) => ({
  type: actionTypes.cart.TOGGLE_DROPDOWN,
  payload: cart
})

export const addProduct = (product) => ({
  type: actionTypes.cart.ADD_PRODUCT,
  payload: product
})
