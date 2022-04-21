/* eslint-disable no-underscore-dangle */
/* eslint-disable default-param-last */

// reducers для поста
import {
  DELETE_DETAIL_POST, GET_CURRENT_POST, LIKE_DETAIL_POST, UPDATE_POST,
} from '../actionTypes/detailPostTypes'

const detailPostReducer = (store = {}, action) => {
  switch (action.type) {
    // обновление поста (в модалке на детальной странице)
    case UPDATE_POST:
      return action.payload

    // получение конкретного поста на детальной странице
    case GET_CURRENT_POST:
      return action.payload

    // удаление конкретного поста при нахождении на детальной странице
    case DELETE_DETAIL_POST:
      return store

    // добавление/удаление лайка при нахождении на детальной странице
    case LIKE_DETAIL_POST:
      return action.payload

    default:
      return store
  }
}

export default detailPostReducer
