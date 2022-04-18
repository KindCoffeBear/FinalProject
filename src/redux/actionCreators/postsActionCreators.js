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
export const getPostsFromServerQuery = (page = '', limit = '', filter = '') => async (dispatch) => {
  const response = await axiosInstance.get(
    `posts/paginate?page=${page}&limit=${limit}&query=${filter}`,
  )
  const dataFromServer = response.data
  dispatch(getPostsFromServer(dataFromServer))
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

const updatePost = (editedPost) => ({
  type: UPDATE_POST,
  payload: editedPost,
})

// обновление поста на сервере и получение данных с сервера
export const updatePostQuery = (id, editedPost, closeModal) => async (dispatch) => {
  const response = await axiosInstance.patch(
    `posts/${id}`,
    editedPost,
  )
  if (response.status === 200) {
    const updatedPostFromServer = response.data
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
export const getPostQuery = (idPost, setLoading, controller) => async (dispatch) => {
  const response = await axiosInstance.get(
    `posts/${idPost}`,
    { signal: controller.current.signal },
  ) // { signal: controller.current.signal } определяет идет запрос или он отменен
  const postFromServer = response.data
  dispatch(getPost(postFromServer))
  setLoading(false)
}
