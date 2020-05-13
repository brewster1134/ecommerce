import actionTypes from './action-types'

const INITIAL_STATE = {
  currentUser: null
}

// REDUCER
//
export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.user.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }

    default:
      return state
  }
}

// ACTIONS
//
export const userSetCurrent = (user) => ({
  type: actionTypes.user.SET_CURRENT_USER,
  payload: user
})
