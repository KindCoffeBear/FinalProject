import axiosInstance from '../../axiosConfig/axiosConfig'
import { GET_ALL_COMMENTS } from '../actionTypes/commentsTypes'

const getAllComments = (commentsFromServer) => ({
  type: GET_ALL_COMMENTS,
  payload: commentsFromServer,
})

// получение всех комментов с сервера
// eslint-disable-next-line import/prefer-default-export
export const getCommentsFromServerQuery = () => async (dispatch) => {
  const response = await axiosInstance.get(
    'posts/comments',
  )
  const dataFromServer = response.data
  dispatch(getAllComments(dataFromServer))
}
