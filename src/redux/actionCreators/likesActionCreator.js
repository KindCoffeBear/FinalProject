// import axiosInstance from '../../axiosConfig/axiosConfig'
import { ADD_LIKE, DELETE_LIKE } from '../actionTypes/likesTypes'

const addLike = (data) => ({
  type: ADD_LIKE,
  payload: data,
})

export const addLikeQuery = (idPost, token) => async (dispatch) => {
  const response = await fetch(
    `https://api.react-learning.ru/posts/likes/${idPost}`,
    {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  )
  const objectFromServer = await response.json()
  const likesFromServer = objectFromServer.likes
  console.log(likesFromServer)
  dispatch(addLike(likesFromServer))
}

const deleteLike = (data) => ({
  type: DELETE_LIKE,
  payload: data,
})

export const deleteLikeQuery = (idPost, token) => async (dispatch) => {
  const response = await fetch(
    `https://api.react-learning.ru/posts/likes/${idPost}`,
    {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  )
  const objectFromServer = await response.json()
  const likesFromServer = objectFromServer.likes
  console.log(likesFromServer)
  dispatch(deleteLike(likesFromServer))
}
