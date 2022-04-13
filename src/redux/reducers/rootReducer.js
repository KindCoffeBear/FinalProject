import { combineReducers } from 'redux'
import filterReducer from './filterReducer'
import postsReducer from './postsReducer'
<<<<<<< HEAD
import commentsReducer from './commentsReducer'
=======
import userReducer from './userReducers'
>>>>>>> dev

// создаем главный reducer, который объединяет в себя все отдельные reducers
const rootReducer = combineReducers({
  posts: postsReducer,
  filter: filterReducer,
<<<<<<< HEAD
  comments: commentsReducer,
=======
  user: userReducer,
>>>>>>> dev
})

export default rootReducer
