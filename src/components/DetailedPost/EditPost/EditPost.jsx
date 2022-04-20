import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updatePostQuery } from '../../../redux/actionCreators/detailPostActionCreator'

function EditPost({
  title, text, image, tags, closeModal,
}) {
  const { idPost } = useParams() // получение id поста
  // делаем управляемое состояние формы
  const [editTitle, setEditTitle] = useState(title)
  const [editText, setEditText] = useState(text)
  const [editImage, setEditImage] = useState(image)
  const [editTags, setEditTags] = useState(tags)
  const dispatch = useDispatch() // достаем dispatch

  // меняем состояние формы
  const changeHead = (e) => {
    setEditTitle(e.target.value)
  }
  const changeDescription = (e) => {
    setEditText(e.target.value)
  }

  const changeLink = (e) => {
    setEditImage(e.target.value)
  }

  const changeTag = (e) => {
    setEditTags(e.target.value)
  }

  // отправляем форму для редактирования поста
  const submitHandler = (e) => {
    e.preventDefault()

    const editedPost = {
      title: editTitle,
      text: editText,
      image: editImage,
      tags: editTags,
    }

    dispatch(updatePostQuery(idPost, editedPost, closeModal))
  }

  return (
    <form className="d-flex flex-column align-items-center" onSubmit={submitHandler}>
      <div className="mb-3">
        <input onChange={changeHead} name="head" placeholder="Заголовок поста" type="text" className="form-control" value={editTitle} />
      </div>
      <div className="mb-3">
        <input onChange={changeDescription} name="description" placeholder="Текст поста" type="text" className="form-control" value={editText} />
      </div>
      <div className="mb-3">
        <input onChange={changeLink} name="link" placeholder="Ссылка на картинку" type="text" className="form-control" value={editImage} />
      </div>
      <div className="mb-3">
        <input onChange={changeTag} name="tag" placeholder="Тег" type="text" className="form-control" value={editTags} />
      </div>
      <button type="submit" className="btn btn-primary">Отправить</button>
    </form>
  )
}

export default EditPost
