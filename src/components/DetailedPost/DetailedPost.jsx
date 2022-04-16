import { useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getPostQuery } from '../../redux/actionCreators/postsActionCreators'
import withLoader from '../hocs/withLoader'
import Modal from '../Modal/Modal'
import EditPost from './EditPost/EditPost'

function DetailedPost() {
  const { idPost } = useParams() // получение id поста

  const posts = useSelector((store) => store.posts) // получение состояния постов (массив) из редакса
  const token = useSelector((store) => store.user.token)
  // eslint-disable-next-line no-underscore-dangle
  const indexPost = posts.findIndex((item) => item._id === idPost) // поиск индекса текущего поста в массиве
  const post = posts[indexPost] // получение текущего поста

  const [loading, setLoading] = useState(false) // состояние загрузки (реакт)

  const controller = useRef(new AbortController()) // состояние controller для обрыва соединения с сервером
  const [viewModal, setViewModal] = useState(false) // состояние модалки (закрыта/открыта)

  const dispatch = useDispatch() // достаем dispatch

  // Монтируем объект до рендера компонента
  useLayoutEffect(() => {
    setLoading(true) // ставим флаг, что страница загружается, пока данные из сервера получаются

    dispatch(getPostQuery(idPost, token, setLoading, controller)) // получаем конкретный пост и передаем часть параметров

    // при отмены загрузки данных с сервера выполняем обрыв соединения
    return () => {
      controller.current.abort()
    }
  }, [])

  // задаем состояние открытой модалки
  const openModal = () => {
    setViewModal(true)
  }

  // задаем состояние закрытой модалки
  const closeModal = () => {
    setViewModal(false)
  }

  // испльзуем hoc withLoader
  const DetailedPostwithLoader = withLoader(() => (
    <div className="container card my-2">
      <div className="card-body">
        <h2 className="card-text">{post.title}</h2>
      </div>
      <img src={post.image} className="card-img-top" alt="" />
      <div className="card-body">
        <p className="card-text">{post.text}</p>
      </div>
      <p>
        #
        {post.tags}
      </p>
      <button onClick={openModal} type="button" className="btn btn-primary my-2">Редактировать</button>
      <Link to="/" className="btn btn-success my-2">Вернуться назад</Link>
    </div>
  ))

  return (
    <>
      <DetailedPostwithLoader loading={loading} />
      <Modal state={viewModal} closeModal={closeModal}>
        <EditPost closeModal={closeModal} {...post} />
      </Modal>
    </>
  )
}

export default DetailedPost
