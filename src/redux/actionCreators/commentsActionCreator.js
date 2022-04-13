import axios from 'axios'
import API_TOKEN from '../../constants'
import { GET_ALL_COMMENTS } from '../actionTypes/commentsTypes'

const getAllComments = (commentsFromServer) => ({
  type: GET_ALL_COMMENTS,
  payload: commentsFromServer,
})

// получение всех комментов с сервера
// eslint-disable-next-line import/prefer-default-export
export const getCommentsFromServerQuery = () => async (dispatch) => {
  const response = await axios.get(
    'https://api.react-learning.ru/posts/comments',
    {
      headers: { authorization: `Bearer ${API_TOKEN}` },
    },
  )
  const dataFromServer = response.data
  dispatch(getAllComments(dataFromServer))
}
