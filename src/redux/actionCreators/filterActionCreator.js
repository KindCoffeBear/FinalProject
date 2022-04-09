/* eslint-disable import/prefer-default-export */

// Создание Action Creators для состояния фильтра
import { SET_FILTER } from '../actionTypes/filterTypes'

export const setFilter = (newFilterValue) => ({
  type: SET_FILTER,
  payload: newFilterValue,
})
