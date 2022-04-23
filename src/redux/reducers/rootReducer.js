import { combineReducers } from 'redux'
import filterReducer from './filterReducer'
import postsReducer from './postsReducer'
import commentsReducer from './commentsReducer'
import userReducer from './userReducers'
import commentsPostReducer from './commentsPostReducer'
import detailPostReducer from './detailPostReducer'

// создаем главный reducer, который объединяет в себя все отдельные reducers
const rootReducer = combineReducers({
  paginatePost: postsReducer,
  filter: filterReducer,
  comments: commentsReducer,
  user: userReducer,
  commentsPost: commentsPostReducer,
  post: detailPostReducer,
})

export default rootReducer
