import { GET_ALL_COMMENTS } from '../actionTypes/commentsTypes'

// eslint-disable-next-line default-param-last
const commentsReducer = (store = [], action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return action.payload

    default:
      return store
  }
}

export default commentsReducer
