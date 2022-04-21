/* eslint-disable default-param-last */

// reducers для постf
import { DELETE_DETAIL_POST, GET_CURRENT_POST, UPDATE_POST } from '../actionTypes/detailPostTypes'

const detailPostReducer = (store = {}, action) => {
  switch (action.type) {
    // обновление поста (в модалке на детальной странице)
    case UPDATE_POST: // пока не работает
      // if (store.post.idPost === action.payload.idPost) {
      return action.payload
      // }

      // return store.post

      // получение конкретного поста на детальной странице
    case GET_CURRENT_POST:
      return action.payload

    // удаление конкретного поста при нахождении на детальной странице
    case DELETE_DETAIL_POST:
      return store

    default:
      return store
  }
}

export default detailPostReducer
