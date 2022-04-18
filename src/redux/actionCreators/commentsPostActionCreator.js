import axiosInstance from '../../axiosConfig/axiosConfig'
import { ADD_NEW_COMMENT, DELETE_COMMENT, GET_COMMENTS_POST } from '../actionTypes/commentsPost'

const getCommentsPost = (commentsPostFromServer) => ({
  type: GET_COMMENTS_POST,
  payload: commentsPostFromServer,
})

// получение комментов одного поста с сервера
// eslint-disable-next-line import/prefer-default-export
export const getCommentsPostFromServerQuery = (id, token) => async (dispatch) => {
  const response = await axiosInstance.get(
    `posts/comments/${id}`,
    { headers: { authorization: `Bearer ${token}` } },
  )
  const dataFromServer = response.data
  dispatch(getCommentsPost(dataFromServer))
}

const addNewComment = (commentsPostFromServer) => ({
  type: ADD_NEW_COMMENT,
  payload: commentsPostFromServer.comments,
})

export const addNewCommentQuery = (id, preparedComment, token) => async (dispatch) => {
  const response = await axiosInstance.post(
    `posts/comments/${id}`,
    preparedComment,
    { headers: { authorization: `Bearer ${token}` } },
  )
  const dataFromServer = response.data
  console.log(response.status)
  dispatch(addNewComment(dataFromServer))
}

const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  payload: id,
})

// удаление комментария по id
export const deleteCommentQuery = (idPost, idComment, token) => async (dispatch) => {
  const response = await axiosInstance.delete(
    `posts/comments/${idPost}/${idComment}`,
    { headers: { authorization: `Bearer ${token}` } },
  )
  console.log(response.status)
  if (response.status === 200) {
    dispatch(deleteComment(idComment))
  }
}
