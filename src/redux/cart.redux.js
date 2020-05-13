import actionTypes from './action-types'

const INITIAL_STATE = {
  dropdownVisible: false
}

// reducer
export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.cart.TOGGLE_DROPDOWN:
      return {
        ...state,
        dropdownVisible: !state.dropdownVisible
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
