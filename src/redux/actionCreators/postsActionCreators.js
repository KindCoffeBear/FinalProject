/* eslint-disable default-param-last */
// Создание Action Creators для состояния постов

// не забыть вернуть GET_CURRENT_POST UPDATE_POST
import axiosInstance from '../../axiosConfig/axiosConfig'
import {
  ADD_NEW_POST, DELETE_POST, GET_POSTS_FROM_SERVER, LIKE_POST,
} from '../actionTypes/postsTypes'

const getPostsFromServer = (postsFromServer) => ({
  type: GET_POSTS_FROM_SERVER,
  payload: postsFromServer,
})

// получение всех постов с сервера
export const getPostsFromServerQuery = (page = '', limit = '', filter = '', setLoading) => async (dispatch) => {
  const response = await axiosInstance.get(
    `posts/paginate?page=${page}&limit=${limit}&query=${filter}`,
  )
  const dataFromServer = response.data
  dispatch(getPostsFromServer(dataFromServer))
  setLoading(false)
}

const addNewPost = (newPost) => ({
  type: ADD_NEW_POST,
  payload: newPost,
})

// добавление поста на сервере и получение данных с сервера
export const addNewPostQuery = (newPost) => async (dispatch) => {
  const bodyObject = JSON.parse(newPost)
  const response = await axiosInstance.post(
    'posts',
    bodyObject,
  )

  const postFromApi = response.data
  dispatch(addNewPost(postFromApi))
}

const deletePost = (id) => ({
  type: DELETE_POST,
  payload: id,
})

// удаление поста по id
export const deletePostQuery = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(
      `posts/${id}`,
    )

    dispatch(deletePost(id))
  } catch (e) {
    const codeError = e.message.slice(-3)
    if (codeError === '403') {
      alert('Вы не можете удалить чужой пост')
    }
  }
}

const addLike = (data) => ({
  type: LIKE_POST,
  payload: data,
})

export const addLikeQuery = (idPost) => async (dispatch) => {
  const response = await axiosInstance.put(
    `posts/likes/${idPost}`,
  )
  const likesFromServer = await response.data
  dispatch(addLike(likesFromServer))
}

const deleteLike = (likesFromServer) => ({
  type: LIKE_POST,
  payload: likesFromServer,
})

export const deleteLikeQuery = (idPost) => async (dispatch) => {
  const response = await axiosInstance.delete(
    `posts/likes/${idPost}`,
  )
  const likesFromServer = await response.data
  dispatch(deleteLike(likesFromServer))
}
