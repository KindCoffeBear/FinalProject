/* eslint-disable default-param-last */

import {
  EDIT_PROFILE,
  GET_USER_FROM_API, SIGN_IN, SIGN_OUT, SIGN_UP,
} from '../actionTypes/userType'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        ...action.payload,
      }
    case SIGN_UP:
      return {
        ...state,
        ...action.payload,
      }
    case SIGN_OUT:
      return {
        ...state,
        ...action.payload,
      }
    case EDIT_PROFILE:
      return {
        ...state,
        ...action.payload,
      }
    case GET_USER_FROM_API:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default userReducer
