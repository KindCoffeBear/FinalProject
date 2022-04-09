/* eslint-disable default-param-last */
// reducer для фильтра
import { SET_FILTER } from '../actionTypes/filterTypes'

// reducer для установки значения фильтра
const filterReducer = (store = '', action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload

    default:
      return store
  }
}

export default filterReducer
