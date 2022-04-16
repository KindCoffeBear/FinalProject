/* eslint-disable default-param-last */
// Создание Action Creators для состояния постов
import axiosInstance from '../../axiosConfig/axiosConfig'
// не забыть вернуть GET_CURRENT_POST UPDATE_POST
import {
  ADD_NEW_POST, DELETE_POST, GET_CURRENT_POST, GET_POSTS_FROM_SERVER, UPDATE_POST,
} from '../actionTypes/postsTypes'

const getPostsFromServer = (postsFromServer) => ({
  type: GET_POSTS_FROM_SERVER,
  payload: postsFromServer,
})

// получение всех постов с сервера
export const getPostsFromServerQuery = (filter = '', token) => async (dispatch) => {
  const response = await axiosInstance.get(
    `posts/search/?query=${filter}`,
    { headers: { authorization: `Bearer ${token}` } },
  )
  const dataFromServer = response.data
  dispatch(getPostsFromServer(dataFromServer))
}

const addNewPost = (newPost) => ({
  type: ADD_NEW_POST,
  payload: newPost,
})

// добавление поста на сервере и получение данных с сервера
export const addNewPostQuery = (newPost, token) => async (dispatch) => {
  const bodyObject = JSON.parse(newPost)

  const response = await axiosInstance.post(
    'posts',
    bodyObject,
    { headers: { authorization: `Bearer ${token}` } },
  )

  const postFromApi = response.data
  dispatch(addNewPost(postFromApi))
}

const deletePost = (id) => ({
  type: DELETE_POST,
  payload: id,
})

// удаление поста по id
export const deletePostQuery = (id, token) => async (dispatch) => {
  const response = await axiosInstance.delete(
    `posts/${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )

  if (response.status === 200) {
    dispatch(deletePost(id))
  }
}

const updatePost = (newPhoneObject) => ({
  type: UPDATE_POST,
  payload: newPhoneObject,
})

// обновление поста на сервере и получение данных с сервера
export const updatePostQuery = (id, formData, closeModal) => async (dispatch) => {
  const response = await fetch(`http://localhost:3000/api/v1/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  if (response.status === 200) {
    const updatedPostFromServer = await response.json()
    dispatch(updatePost(updatedPostFromServer))
    closeModal()
  } else {
    alert('Введите все данные')
  }
}

const getPost = (postFromServer) => ({
  type: GET_CURRENT_POST,
  payload: postFromServer,
})

// получение конкретного поста по id и передача setLoading (изменение состояния загрузки страницы) и controller для отмены загрузки страницы
export const getPostQuery = (id, token, setLoading, controller) => async (dispatch) => {
  const response = await axiosInstance.get(
    `posts/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    { signal: controller.current.signal },
  ) // { signal: controller.current.signal } определяет идет запрос или он отменен
  const postFromServer = response.data
  dispatch(getPost(postFromServer))
  setLoading(false)
}
