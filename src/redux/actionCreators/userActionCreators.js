/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
// достаем axios
import axios from 'axios'
// достаем axios со своими настройками
import axiosInstance from '../../axiosConfig/axiosConfig'
import {
  EDIT_PROFILE, GET_USER_FROM_API,
  SIGN_IN, SIGN_OUT, SIGN_UP,
} from '../actionTypes/userType'
// пишем AC для входа в систему
export const signIn = (user) => ({
  type: SIGN_IN,
  payload: user,
})

export const signInQuery = ({ email, password, cb }) => async (dispatch) => {
  const response = await axiosInstance.post('signin', {
    email,
    password,
  })

  const user = response.data

  dispatch(
    signIn({
      ...user.data,
      token: user.token,
    }),
  )

  typeof cb === 'function' && cb()
}
// пишем AC для регистрации
export const signUp = (user) => ({
  type: SIGN_UP,
  payload: user,
})

export const signUpQuery = ({
  email, password, name, about, avatar, cb,
}) => async (dispatch) => {
  const upResponse = await axiosInstance.post('signup', {
    email,
    password,
    name,
    about,
    avatar,
  })
  const user = upResponse.data
  console.log(user)
  dispatch(
    signUp({
      ...user.data,
    }),
  )
  const inResponse = await axiosInstance.post('signin', {
    email: user.email,
    password,
  })

  const userForIn = inResponse.data

  dispatch(
    signIn({
      ...userForIn.data,
      token: userForIn.token,
    }),
  )
  typeof cb === 'function' && cb()
}
// пишем AC для выхода из системы
export const signOut = (user) => ({
  type: SIGN_OUT,
  payload: {
    ...user,
    token: '',
  },
})
// пишем AC для редактирования профиля
export const editProfile = (changedUserData) => ({
  type: EDIT_PROFILE,
  payload: changedUserData,
})

export const editProfileQuery = (newName, newAbout, token) => async (dispatch) => {
  const response = await axiosInstance.patch(
    'users/me',
    {
      name: newName,
      about: newAbout,
    },
    { headers: { authorization: `Bearer ${token}` } },
  )
  const changedUser = await response.data
  dispatch(editProfile(changedUser))
}
// пишем AC для редактирования аватра
export const editAvatar = (changedUserData) => ({
  type: EDIT_PROFILE,
  payload: changedUserData,
})

export const editAvatarQuery = (newAvatar, token) => async (dispatch) => {
  const response = await axiosInstance.patch(
    'users/me/avatar',
    {
      avatar: newAvatar,
    },
    { headers: { authorization: `Bearer ${token}` } },
  )
  const changedAvatar = await response.data
  dispatch(editAvatar(changedAvatar))
}
// пишем AC для получения пользователя с сервера
export const getUserFromApi = (userDataFromApi, token) => ({
  type: GET_USER_FROM_API,
  payload: {
    ...userDataFromApi,
    token,
  },
})

export const getUserFromApiQuery = (token) => async (dispatch) => {
  console.log(token)
  const response = await axios.get(
    'https://api.react-learning.ru/users/me',
    { headers: { authorization: `Bearer ${token}` } },
  )
  const userFromApi = response.data
  console.log(userFromApi)
  dispatch(getUserFromApi(userFromApi, token))
}
