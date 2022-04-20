import axiosInstance from '../../axiosConfig/axiosConfig'
import { GET_CURRENT_POST, UPDATE_POST } from '../actionTypes/detailPostTypes'

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
    console.log({ updatedPostFromServer })
    dispatch(updatePost(updatedPostFromServer))
    closeModal()
  } else {
    alert('Возможно, вы пытаетесь изменить пост, который делали не вы. Пожалуйста, выберите один из ваших')
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
