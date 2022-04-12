/* eslint-disable default-param-last */
import SIGN_IN from '../actionTypes/userType'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default userReducer
