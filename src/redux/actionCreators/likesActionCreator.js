import axiosInstance from '../../axiosConfig/axiosConfig'
import { ADD_LIKE, DELETE_LIKE } from '../actionTypes/likesTypes'

const addLike = (data) => ({
  type: ADD_LIKE,
  payload: data,
})

export const addLikeQuery = (idPost) => async (dispatch) => {
  const response = await axiosInstance.put(
    `posts/likes/${idPost}`,
  )
  const likesFromServer = response.data.likes
  dispatch(addLike(likesFromServer))
}

const deleteLike = (data) => ({
  type: DELETE_LIKE,
  payload: data,
})

export const deleteLikeQuery = (idPost) => async (dispatch) => {
  const response = await axiosInstance.delete(
    `posts/likes/${idPost}`,
  )
  const likesFromServer = response.data.likes
  dispatch(deleteLike(likesFromServer))
}
