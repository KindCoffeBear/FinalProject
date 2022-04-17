// задаем начальное состояние Redux
const initState = {
  posts: [],
  filter: '',
  comments: [],
  user: {
    name: '',
    email: '',
    token: '',
  },
  commentsPost: [],
  likes: [],
}

export default initState
