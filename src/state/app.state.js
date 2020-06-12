import { createSelector } from 'reselect'

import actionTypes from './action-types'

const INITIAL_STATE = {
  isLoading: true
}

//
// ACTIONS
//
export const toggleLoading = (isLoading) => ({
  type: actionTypes.app.IS_LOADING,
  payload: isLoading
})

//
// REDUCER
//
export const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.app.IS_LOADING:
      const isLoading =
        action.payload === undefined ? !state.isLoading : action.payload

      return {
        ...state,
        isLoading
      }

    default:
      return state
  }
}

//
// SELECTORS
//
const selectApp = (state) => state.app

export const selectIsLoading = createSelector(selectApp, (app) => app.isLoading)
