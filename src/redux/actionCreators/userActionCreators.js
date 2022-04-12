/* eslint-disable no-unused-expressions */
import axiosInstance from '../../axiosConfig/axiosConfig'
import SIGN_IN from '../actionTypes/userType'

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
