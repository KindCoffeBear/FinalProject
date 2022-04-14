import axios from 'axios'
import { GET_ALL_COMMENTS } from '../actionTypes/commentsTypes'

const getAllComments = (commentsFromServer) => ({
  type: GET_ALL_COMMENTS,
  payload: commentsFromServer,
})

// получение всех комментов с сервера
// eslint-disable-next-line import/prefer-default-export
export const getCommentsFromServerQuery = (token) => async (dispatch) => {
  const response = await axios.get(
    'https://api.react-learning.ru/posts/comments',
    {
      headers: { authorization: `Bearer ${token}` },
    },
  )
  const dataFromServer = response.data
  dispatch(getAllComments(dataFromServer))
}
