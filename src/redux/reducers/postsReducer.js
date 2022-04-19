/* eslint-disable default-param-last */

// reducers для постов
import {
  ADD_NEW_POST, DELETE_POST, GET_POSTS_FROM_SERVER,
} from '../actionTypes/postsTypes'

const postsReducer = (store = [], action) => {
  switch (action.type) {
    // получение всех постов
    case GET_POSTS_FROM_SERVER:
      return action.payload

    // добавление постов
    case ADD_NEW_POST:
      return [...store, action.payload]

    // удаление постов
    case DELETE_POST:
      // eslint-disable-next-line no-underscore-dangle
      return store.filter((post) => post._id !== action.payload)

    default:
      return store
  }
}

export default postsReducer
