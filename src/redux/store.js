// задаем начальное состояние Redux
const initState = {
  paginatePost: {
    total: 0,
    posts: [],
  },
  filter: '',
  limit: '',
  comments: [],
  user: {
    name: '',
    email: '',
    token: '',
  },
  commentsPost: [],
}

export default initState
