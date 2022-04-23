/* import {
  useEffect, useState,
} from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { setFilter } from '../../../redux/actionCreators/filterActionCreator'

let isMount = false

function SearchPost() {
  const [searchInputHead, setSearchInputHead] = useState('') // состояние инпута для поиска
  const [searchParams, setSearchParams] = useSearchParams() // используем, чтобы достать значение фильтра из адресной строки

  const dispatch = useDispatch() // достаем dispatch

  // меняем состояние инспута для поиска
  const changeHandler = (e) => {
    setSearchInputHead(e.target.value)
  }

  // получение постов по фильтру при изменении состояния фильтра с проверкой смонтирован компонент или нет
  useEffect(() => {
    if (isMount) {
      const filter = {
        searchHead: searchInputHead,
      } // внесение параметров в фильтр (может быть несколько при большом фильтре)

      const filterForURL = encodeURIComponent(JSON.stringify(filter)) // кодирование строки

      const query = `filter=${filterForURL}` // придание вида квери параметра в адресной строке

      if (filter.searchHead) { setSearchParams(query) } else { setSearchParams('') } // условие по очистке квери параметра в адресной строке

      dispatch(setFilter(query)) // меняем состояние фильтра в Redux
    } else {
      isMount = true

      const parsedQuery = JSON.parse(searchParams.get('filter')) // получение значения фильтра из адресной строки

      if (parsedQuery && parsedQuery.searchHead) {
        setSearchInputHead(parsedQuery.searchHead) // вставляем в инпут значение фильтра из адресной строки
        dispatch(setFilter(parsedQuery)) // меняем состояние фильтра в redux
      }
    }
  }, [searchInputHead])

  return (
    <form className="d-flex flex-column align-items-center">
      <div className="mb-3">
        <input onChange={changeHandler} name="head" placeholder="Поиск по заголовку" type="text" className="form-control" value={searchInputHead} />
      </div>
    </form>
  )
}

export default SearchPost */
