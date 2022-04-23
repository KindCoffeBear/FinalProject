/* eslint-disable no-underscore-dangle */
/* eslint-disable default-param-last */

// reducers для постов
import {
  ADD_NEW_POST, DELETE_POST, GET_POSTS_FROM_SERVER, LIKE_POST,
} from '../actionTypes/postsTypes'

const postsReducer = (store = {}, action) => {
  switch (action.type) {
    // получение всех постов
    case GET_POSTS_FROM_SERVER:
      return action.payload

    // добавление постов
    case ADD_NEW_POST:
      return { ...store, posts: [...store.posts, action.payload] }

    // удаление постов
    case DELETE_POST:
      // eslint-disable-next-line no-underscore-dangle
      return { ...store, posts: store.posts.filter((post) => post._id !== action.payload) }

    case LIKE_POST:
      return {
        ...store,
        posts: store.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload
          }
          return post
        }),
      }

    default:
      return store
  }
}

export default postsReducer
