/* eslint-disable default-param-last */

// reducers для постf
import { GET_CURRENT_POST, UPDATE_POST } from '../actionTypes/detailPostTypes'
// import {
//   DELETE_POST,
// } from '../actionTypes/postsTypes'

const detailPostReducer = (store = {}, action) => {
  switch (action.type) {
    // обновление поста (в модалке на детальной странице)
    case UPDATE_POST: // пока не работает
      if (store.post.idPost === action.payload.idPost) {
        return action.payload
      }

      return store.post

      // получение конкретного поста на детальной странице
    case GET_CURRENT_POST:
      return action.payload

    default:
      return store
  }
}

export default detailPostReducer
