/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
import axiosInstance from '../../axiosConfig/axiosConfig'
import { GET_TOKEN, SIGN_IN, SIGN_UP } from '../actionTypes/userType'

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

export const signUp = (user) => ({
  type: SIGN_UP,
  payload: user,
})

export const signUpQuery = ({ email, password, cb }) => async (dispatch) => {
  const response = await axiosInstance.post('signup', {
    email,
    password,
  })
  console.log(response.status)
  if (response.status === 400) {
    alert('Некорректно заполнены поля формы!')
  } else if (response.status === 409) {
    alert('Пользователь с таким адресом электронной почты уже зарегистрирован в системе!')
  } else {
    const user = response.data
    dispatch(
      signUp({
        ...user.data,
      }),
    )
  }
  typeof cb === 'function' && cb()
}

export const getTokenFromLS = (user) => ({
  type: GET_TOKEN,
  payload: {
    name: user.name,
    email: user.email,
    token: user.token,
  },
})
