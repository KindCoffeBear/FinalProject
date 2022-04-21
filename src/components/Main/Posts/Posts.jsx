import {
  Button,
  Divider,
  FormControl, Grid, InputLabel, MenuItem, Select,
} from '@mui/material'
import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { setFilter } from '../../../redux/actionCreators/filterActionCreator'
import { getCommentsFromServerQuery } from '../../../redux/actionCreators/commentsActionCreator'

import { getPostsFromServerQuery } from '../../../redux/actionCreators/postsActionCreators'
import useDebounce from '../../CustomHooks/useDebounce'
import withLoader from '../../hocs/withLoader'
import Post from './Post/Post'

let isMount = false

function Posts() {
  // получение состояния постов и фильтра из Redux
  const posts = useSelector((store) => store.paginatePost.posts)
  const total = useSelector((store) => store.paginatePost.total)
  const filter = useSelector((store) => store.filter)

  const [limit, setLimit] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const countPages = limit ? Math.ceil(total / limit) : null
  const numbersPage = countPages ? Array(countPages).fill().map((x, i) => i + 1) : null

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
    dispatch(getPostsFromServerQuery(page, limit, debouncedFilter, setLoading))
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <FormControl sx={{ m: 1, minWidth: 160 }} variant="standard">
          <InputLabel id="limit">Кол-во постов</InputLabel>
          <Select
            labelId="limit"
            id="limit-select"
            value={limit}
            label="limit"
            onChange={changeHandler}
          >
            <MenuItem value="Все">Все</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={60}>60</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {posts.map((post) => (
          // eslint-disable-next-line no-underscore-dangle
          <Post key={post._id} {...post} />
        ))}
      </Grid>
      <Box
        fullWidth
        sx={{
          mt: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        }}
      >

        {numbersPage ? numbersPage.map((number) => (
          <React.Fragment key={number}>
            <Button onClick={changePageHandler} sx={{ width: 10 }}>
              {number}
            </Button>
            <Divider orientation="vertical" flexItem />
          </React.Fragment>
        )) : null}

      </Box>
    </Box>
  ))

  return (
    <PostsWithLoader loading={loading} />
  )
}

export default Posts
