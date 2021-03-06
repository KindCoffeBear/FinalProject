import axiosInstance from '../../axiosConfig/axiosConfig'
import { ADD_NEW_COMMENT, DELETE_COMMENT, GET_COMMENTS_POST } from '../actionTypes/commentsPost'

const getCommentsPost = (commentsPostFromServer) => ({
  type: GET_COMMENTS_POST,
  payload: commentsPostFromServer,
})

// получение комментов одного поста с сервера
// eslint-disable-next-line import/prefer-default-export
export const getCommentsPostFromServerQuery = (id) => async (dispatch) => {
  const response = await axiosInstance.get(
    `posts/comments/${id}`,
  )
  const dataFromServer = response.data
  dispatch(getCommentsPost(dataFromServer))
}

const addNewComment = (commentsPostFromServer) => ({
  type: ADD_NEW_COMMENT,
  payload: commentsPostFromServer,
})

export const addNewCommentQuery = (id, preparedComment) => async (dispatch) => {
  await axiosInstance.post(
    `posts/comments/${id}`,
    preparedComment,
  )

  const response = await axiosInstance.get(
    `posts/comments/${id}`,
  )

  const dataFromServer = response.data
  dispatch(addNewComment(dataFromServer))
}

const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  payload: id,
})

// удаление комментария по id
export const deleteCommentQuery = (idPost, idComment) => async (dispatch) => {
  const response = await axiosInstance.delete(
    `posts/comments/${idPost}/${idComment}`,
  )
  if (response.status === 200) {
    dispatch(deleteComment(idComment))
  }
}
