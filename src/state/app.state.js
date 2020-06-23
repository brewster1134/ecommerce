import { createSelector } from 'reselect'

import actionTypes from './action-types'

const INITIAL_STATE = {
  errorMessage: '',
  isLoading: true
}

//
// ACTIONS
//
export const setErrorMessage = (errorMessage) => ({
  type: actionTypes.store.SET_ERROR_MESSAGE,
  payload: errorMessage
})

export const toggleIsLoading = (isLoading) => ({
  type: actionTypes.app.TOGGLE_IS_LOADING,
  payload: isLoading
})

//
// REDUCER
//
export const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.app.TOGGLE_IS_LOADING:
      const isLoading =
        action.payload === undefined ? !state.isLoading : action.payload

      return {
        ...state,
        isLoading
      }

    case actionTypes.store.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload
      }

    default:
      return state
  }
}

//
// SELECTORS
//
const selectApp = (state) => state.app

export const selectErrorMessage = createSelector(
  selectApp,
  (app) => app.errorMessage
)

export const selectIsLoading = createSelector(selectApp, (app) => app.isLoading)
