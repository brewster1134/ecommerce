import { createSelector } from 'reselect'

import actionTypes from './action-types'

const INITIAL_STATE = {
  currentUser: null
}

// ACTIONS
//
export const setCurrentUser = (user) => ({
  type: actionTypes.user.SET_CURRENT_USER,
  payload: user
})

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

// SELECTORS
//
const selectUser = (state) => state.user

export const selectCurrentUser = createSelector(
  selectUser,
  (user) => user.currentUser
)
