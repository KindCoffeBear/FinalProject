import { combineReducers } from 'redux'
import filterReducer from './filterReducer'
import postsReducer from './postsReducer'

// создаем главный reducer, который объединяет в себя все отдельные reducers
const rootReducer = combineReducers({
  posts: postsReducer,
  filter: filterReducer,
})

export default rootReducer
