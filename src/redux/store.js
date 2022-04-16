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
}

export default initState
