import { ADD_LIKE, DELETE_LIKE } from '../actionTypes/likesTypes'

// eslint-disable-next-line default-param-last
const likesReduser = (store = [], action) => {
  switch (action.type) {
    case ADD_LIKE:
      return action.payload

    case DELETE_LIKE:
      return action.payload

    default:
      return store
  }
}

export default likesReduser
