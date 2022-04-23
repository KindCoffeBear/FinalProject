// задаем начальное состояние Redux
const initState = {
  paginatePost: {
    total: 0,
    posts: [],
  },
  filter: '',
  comments: [],
  user: {
    name: '',
    email: '',
    token: '',
  },
  commentsPost: [],
  post: {},
}

export default initState
