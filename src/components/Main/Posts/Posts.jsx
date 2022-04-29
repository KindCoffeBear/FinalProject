import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { setFilter } from '../../../redux/actionCreators/filterActionCreator'
import { getCommentsFromServerQuery } from '../../../redux/actionCreators/commentsActionCreator'

import { getPostsFromServerQuery } from '../../../redux/actionCreators/postsActionCreators'
import useDebounce from '../../CustomHooks/useDebounce'
import withLoader from '../../hocs/withLoader'
import Post from './Post/Post'
import Limit from './Limit/Limit'
import PageNumbers from './PageNambers/PageNumbers'

let isMount = false

function Posts() {
  // получение состояния постов и фильтра из Redux
  const posts = useSelector((store) => store.paginatePost.posts)
  const total = useSelector((store) => store.paginatePost.total)
  const filter = useSelector((store) => store.filter)

  const [limit, setLimit] = useState('')
  const [page, setPage] = useState('1')
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const countPages = limit ? Math.ceil(total / limit) : null
  const numbersPage = countPages ? Array(countPages).fill().map((x, i) => `${i + 1}`) : null

  // получаем дебаунсер
  const debouncedFilter = useDebounce(filter, 300)
  // достаем dispatch
  const dispatch = useDispatch()
  // получаем данные из сервера при монтировании и при изменении значения debouncedFilter
  useEffect(() => {
    if (isMount) {
      const queryURL = {
        search: debouncedFilter,
        limit,
        page,
      }

      const queryForURL = encodeURIComponent(JSON.stringify(queryURL))
      const query = `paginate=${queryForURL}`
      if (queryURL.search || queryURL.limit) { setSearchParams(query) } else { setSearchParams('') }
    } else {
      isMount = true

      const parsedQuery = JSON.parse(searchParams.get('paginate')) // получение значения фильтра из адресной строки

      if (parsedQuery) {
        if (parsedQuery.search || parsedQuery.limit) {
          setSearchParams(parsedQuery) // вставляем в инпут значение фильтра из адресной строки
          dispatch(setFilter(parsedQuery.search)) // меняем состояние фильтра в redux
          setLimit(parsedQuery.limit)
          setPage(parsedQuery.page)
        }
      }
    }

    dispatch(getCommentsFromServerQuery())
    dispatch(getPostsFromServerQuery(setLoading, page, limit, debouncedFilter))
    setLoading(true)
  }, [debouncedFilter, limit, page])

  const changeHandler = (e) => {
    const limitValue = e.target.value

    if (limitValue === 'Все') { setLimit('') } else { setLimit(limitValue) }
  }

  const changePageHandler = (e) => {
    setPage(e.target.outerText)
  }

  const PostsWithLoader = withLoader(() => (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Limit limit={limit} changeHandler={changeHandler} />
      <Grid container spacing={2} justifyContent="center">
        {posts.map((post) => (
          // eslint-disable-next-line no-underscore-dangle
          <Post key={post._id} {...post} />
        ))}
      </Grid>
      <PageNumbers changePageHandler={changePageHandler} numbersPage={numbersPage} page={page} />
    </Box>
  ))

  return (
    <PostsWithLoader loading={loading} />
  )
}

export default Posts
