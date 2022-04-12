import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsFromServerQuery } from '../../../redux/actionCreators/postsActionCreators'
import useDebounce from '../../CustomHooks/useDebounce'
import Post from './Post/Post'

function Posts() {
  // получение состояния постов и фильтра из Redux
  const posts = useSelector((store) => store.posts)
  const filter = useSelector((store) => store.filter)
  // получаем дебаунсер
  const debouncedFilter = useDebounce(filter, 300)
  // достаем dispatch
  const dispatch = useDispatch()
  // получаем данные из сервера при монтировании и при изменении значения debouncedFilter
  useEffect(() => {
    dispatch(getPostsFromServerQuery(debouncedFilter))
  }, [debouncedFilter])

  return (
    <section data-pictures className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5 justify-content-center" style={{ gap: '30px' }}>
      {
                posts.map((post) => (
                  // eslint-disable-next-line no-underscore-dangle
                  <Post key={post._id} {...post} />
                ))
            }
    </section>
  )
}

export default Posts
