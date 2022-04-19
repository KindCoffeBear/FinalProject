/* eslint-disable default-param-last */

// reducers для постов
import {
  ADD_NEW_POST, DELETE_POST, GET_CURRENT_POST, GET_POSTS_FROM_SERVER, UPDATE_POST,
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

      // обновление поста (в модалке на детальной странице)
    case UPDATE_POST:
      return store.length
        ? store.map((post) => {
          if (post.idPost === action.payload.idPost) {
            return action.payload
          }

          return post
        }) : [action.payload]

      // получение конкретного поста на детальной странице
    case GET_CURRENT_POST:
      return [...store]

    default:
      return store
  }
}

export default postsReducer
