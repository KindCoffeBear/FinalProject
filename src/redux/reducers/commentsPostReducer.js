import { ADD_NEW_COMMENT, GET_COMMENTS_POST, DELETE_COMMENT } from '../actionTypes/commentsPost'

// eslint-disable-next-line default-param-last
const commentsPostReducer = (store = [], action) => {
  switch (action.type) {
    case GET_COMMENTS_POST:
      return action.payload

    case ADD_NEW_COMMENT:
      return action.payload

    case DELETE_COMMENT:
      // eslint-disable-next-line no-underscore-dangle
      return store.filter((comment) => comment._id !== action.payload)

    default:
      return store
  }
}

export default commentsPostReducer
